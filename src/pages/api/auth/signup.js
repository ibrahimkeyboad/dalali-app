import bcrypt from 'bcrypt';
import prisma from '../../../../db';

export default async function handler(req, res) {
  const { name, email, password, country, city, number, code } = req.body;

  const exist = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (exist) {
    return res.status(403).json({ msg: 'Email already exist' });
  }

  const newPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: newPassword,
      country,
      city,
      phoneNumber: `${code}${+number}`,
    },
  });

  await prisma.$disconnect();

  res.status(201).json('done');
}
