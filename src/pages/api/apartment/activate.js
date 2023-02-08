import prisma from '../../../../db';

async function handler(req, res) {
  const { body, method } = req;

  switch (method) {
    case 'PATCH':
      try {
        const data = await prisma.apartment.update({
          where: {
            id: body.id,
          },
          data: {
            isAvailable: body.value,
          },
        });

        return res.status(200).json('done');
      } catch (error) {
        return res.status(500).json(error.message);
      }
  }

  await prisma.$disconnect();
}

export default handler;
