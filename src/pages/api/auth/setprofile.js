import prisma from '../../../../db';

async function handler(req, res) {
  const { method, body } = req;

  console.log(body);

  if (method === 'POST') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      console.log(user);
      const profile = await prisma.profile.create({
        data: {
          userId: user.id,
          bio: body.bio,
          image: body.image,
          category: body.category,
        },
      });

      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  await prisma.$disconnect();
}

export default handler;
