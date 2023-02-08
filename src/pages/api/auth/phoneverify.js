import prisma from '../../../../db';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
export default async function handler(req, res) {
  console.log(req.body);
  const { phoneNumber, code, email } = req.body;
  const respornd = await client.verify.v2
    .services('VAa83fe8bc5309672e732007ddde1fee0b')
    .verificationChecks.create({ to: phoneNumber, code: code });

  if (respornd.status === 'approved') {
    const user = await prisma.user.update({
      data: { isNumberVerify: true },
      where: {
        email: email,
      },
    });
    res.status(200).json(user);
  }
}
