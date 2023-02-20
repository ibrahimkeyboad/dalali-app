import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  const { method, body } = req;
  if (method !== 'POST') {
    return res.status(405).send('Only post request is required');
  }

  try {
    console.log(body);
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          name: body.name,
          price: body.price,
        },
      ],
      success_url: `${req.headers.origin}/profile`,
      cancel_url: `${req.headers.origin}/plan`,
    });

    console.log(session);

    res.status(201).json({ msg: 'done' });
  } catch (error) {
    return res.status(500).json(error);
  }
}
