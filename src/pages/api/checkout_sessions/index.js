import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { method, query, body } = req;
  if (method !== 'POST') {
    return res.status(405).send('Only post request is required');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: body.items,
      success_url: `${req.headers.origin}/profile`,
      cancel_url: `${req.headers.origin}/profile`,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}
