const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export default function handler(req, res) {
  const number = req.body;
  console.log('body', req.body);
  client.verify.v2
    .services('VAa83fe8bc5309672e732007ddde1fee0b')
    .verifications.create({ to: number, channel: 'sms' })
    .then((verification) => {
      res.send('done');
    })
    .catch((e) => console.log(e));
}
