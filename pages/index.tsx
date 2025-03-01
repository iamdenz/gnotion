import { NextSeo } from 'next-seo';
import Image from 'next/future/image';

export default function Home() {
  return (
    <>
      <NextSeo
        openGraph={{
          images: [
            {
              url: process.env.NEXT_PUBLIC_SITE_OG_IMAGE,
              width: 1200,
              height: 630,
              alt: process.env.NEXT_PUBLIC_SITE_TITLE,
            },
          ],
        }}
      />
      <main className="wrapper-middle">
        <div className="wrapper-middle__box">
          <Image
            src="/img/page-not-found-1.png"
            quality={100}
            width={256}
            height={256}
            alt="Page not found"
          />
          <h2>Nothing to see here</h2>
        </div>
      </main>
    </>
  );
}
