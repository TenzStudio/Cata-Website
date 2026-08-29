require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const Member = require('./models/Member');
const Donation = require('./models/Donation');

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Webhook endpoint needs raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Check metadata to see if it's a donation or membership
    if (paymentIntent.metadata.type === 'donation') {
      try {
        await Donation.create({
          email: paymentIntent.receipt_email || paymentIntent.metadata.email || 'unknown@example.com',
          name: paymentIntent.metadata.name || 'Anonymous',
          amount: paymentIntent.amount,
          currency: paymentIntent.currency,
          stripePaymentIntentId: paymentIntent.id
        });
        console.log('Donation saved to DB');
      } catch (err) {
        console.error('Error saving donation:', err);
      }
    } else if (paymentIntent.metadata.type === 'membership') {
      try {
        const email = paymentIntent.metadata.email;
        // Update or create member
        const oneYearFromNow = new Date();
        oneYearFromNow.setFullYear(oneYearFromNow.getFullYear() + 1);

        await Member.findOneAndUpdate(
          { email: email },
          { 
            name: paymentIntent.metadata.name,
            membershipStatus: 'Active',
            membershipExpiryDate: oneYearFromNow,
            stripeCustomerId: paymentIntent.customer
          },
          { upsert: true, new: true }
        );
        console.log('Membership activated in DB');
      } catch (err) {
        console.error('Error saving membership:', err);
      }
    }
  }

  res.json({ received: true });
});

// Regular API endpoints need JSON body parser
app.use(express.json());
app.use(cors());

// Create Payment Intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, type, email, name } = req.body;
    
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: type, // 'donation' or 'membership'
        email: email,
        name: name
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
