import prisma from '../../../../../db';

async function handler(req, res) {
  const { method, query } = req;

  console.log('query', method);

  switch (method) {
    case 'GET':
      try {
        const data = await prisma.apartment.findMany({
          where: {
            owner: query.owner,
          },
          include: {
            images: true,
          },
        });

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json(error.message);
      }
  }

  await prisma.$disconnect();
}

export default handler;
