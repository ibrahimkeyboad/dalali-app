import prisma from '../../../../db';

export default async function handler(req, res) {
  const { body, method, query } = req;
  console.log('query', query);

  switch (method) {
    case 'GET':
      try {
        const data = await prisma.accommodation.findUnique({
          where: {
            id: query.id,
          },
          include: {
            images: true,
            tags: true,
            owner: {
              include: {
                profile: true,
              },
            },
          },
        });
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }

    case 'PATCH':
      try {
        console.log(body);
        const data = await prisma.accommodationa.update({
          where: {
            id: body.id,
          },
          data: {
            description: body.description,
            images: body.images,
            price: body.price,
            type: body.type,
          },
        });
        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    case 'DELETE':
      try {
        const data = await prisma.accommodation.delete({
          where: {
            id: query.id,
          },
        });
        return res.status(204).json(data);
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
  }

  await prisma.$disconnect();
}
