import prisma from '../../../db';

export default async function getUser(req, res) {
  const { method, body, query } = req;

  const { id } = query;

  console.log(body);

  switch (method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: {
            id: id,
          },
          include: {
            profile: true,
          },
        });
        const result = {
          name: user.name,
          email: user.email,
          image: user.profile.image,
          bio: user.profile.bio,
          category: user.profile.category,
          isEmailVerify: user.isEmailVerify,
          isNumberVerify: user.isNumberVerify,
          country: user.country,
          city: user.city,
          phoneNumber: user.phoneNumber,
        };

        await prisma.$disconnect();
        return res.status(200).send(result);
      } catch (error) {
        res.status(500).send(error);
      }

    case 'PATCH':
      try {
        const user = await prisma.user.upsert({
          where: {
            id: id,
          },

          update: {
            name: body.name,
            email: body.email,
          },
          create: {
            name: body.name,
            email: body.email,
          },
        });

        const profile = await prisma.profile.upsert({
          where: {
            userId: id,
          },

          update: {
            bio: body.bio,
            image: body.image,
          },
        });

        res.status(200).send('done');
        await prisma.$disconnect();
      } catch (error) {
        console.log(error.message);
        res.status(500).send(error);
      }

    case 'DELETE':
      try {
        await prisma.user.delete({
          where: {
            id: id,
          },
        });
        res.status(204).send('done');
      } catch (error) {
        res.status(500).send(error);
      }
  }
}
