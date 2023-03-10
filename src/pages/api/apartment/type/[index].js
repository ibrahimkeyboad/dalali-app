import prisma from '../../../../../db';

async function handler(req, res) {
  try {
    const city = await prisma.accommodation.findMany({
      where: {
        type: req.query.index,
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

    res.status(200).json(city);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default handler;
