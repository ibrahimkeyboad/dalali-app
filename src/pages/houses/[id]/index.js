import Image from 'next/image';
import Figere from '../../../components/figerImg';
import style from '../../../../styles/detal.module.css';
import HeadC from '../../../components/head';
import prisma from '../../../../db';

export async function getStaticPaths() {
  const datas = await prisma.accommodation.findMany();

  const paths = datas.map((item) => ({ params: { id: item.id } }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  const data = await prisma.accommodation.findUnique({
    where: {
      id: params.id,
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

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
    revalidate: 10,
  };
}

function Page({ data }) {
  return (
    <div className='bg-slate-50'>
      <HeadC title={data.title} description={data.description} />
      <section className={style.detailSection}>
        <Figere apartment={data} />
        <div className={style.overveiw}>
          <div className={style.overveiw_head}>
            <h2 className={style.heading}>Overview</h2>
            <span className={style.badge}>For {data?.purpose}</span>
          </div>
          <div>
            <div className={style.details}>
              <div className={style.dsc}>
                <h3 className={style.detail_head}>
                  <span className={style.detail_text}>Price:</span>
                  {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </h3>
                <h3 className={style.detail_head}>
                  <span className={style.detail_text}>Address:</span>
                  {data.location}
                </h3>
              </div>
              <figure className={style.user_detail}>
                <Image
                  placeholder='blur'
                  blurDataURL={data.owner?.profile?.image}
                  src={data.owner?.profile?.image}
                  className='rounded-full '
                  alt={data.title}
                  height={80}
                  width={80}
                />
                <figcaption className={style.user_desc}>
                  <span className={style.user_name}>{data.owner.name}</span>
                  <span className={style.user_number}>
                    {data.owner.phoneNumber}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>
          <div className={style.type}>
            <h4 className='flex gap-2 items-center'>What this place offers</h4>
            <ul className='flex flex-wrap gap-10 ml-10'>
              {data.tags.map((tag) => (
                <li className='capitalize' key={tag.id}>
                  {tag.value}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className='p-3 my-4 bg-white rounded-sm divide-y'>
          <h2 className='text-[#2B4865] tracking-widest font-bold text-xl p-3 pb-5 '>
            Description
          </h2>
          <p className='text-[#6d7072] p-4 tracking-wide'>{data.description}</p>
        </div>
      </section>
    </div>
  );
}

export default Page;
