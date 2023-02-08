import prisma from '../../../../db';

async function handler(req, res) {
  const { method, body } = req;
  switch (method) {
    case 'GET':
      try {
        const data = await prisma.accommodation.findMany({
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
        return res.status(500).json({
          error: error.message,
        });
      }

    case 'POST':
      try {
        const accommodation = await prisma.accommodation.create({
          data: {
            userId: body.id,
            duration: body.duration,
            title: body.title,
            description: body.description,
            bathrooms: +body.bathrooms,
            bedrooms: +body.bedrooms,
            type: body.type,
            purpose: body.purpose,
            street: body.street,
            city: body.city,
            country: body.country,
            beds: +body.bed || null,
            price: +body.price,
            area: +body.area,
            sofa: +body.sofa || null,
          },
        });

        body.tags.forEach(async function (tag) {
          await prisma.tag.create({
            data: {
              value: tag.value,
              accommodationId: accommodation.id,
            },
          });
        });

        const images = [];

        for (const image of body.images) {
          const res = await prisma.image.create({
            data: {
              accommodationId: accommodation.id,
              url: image.url,
              imgId: image.public_id,
            },
          });

          images.push(res);
        }

        if (images.length >= 4) return res.status(201).json({ status: 'Done' });
      } catch (error) {
        console.log('error', error.message);
        return res.status(500).json({
          error: error.message,
        });
      }
  }

  await prisma.$disconnect();
}

export default handler;
