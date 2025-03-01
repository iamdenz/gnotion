import { useColorScheme } from '@mantine/hooks';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { getPageTitle } from 'notion-utils';
import { NotionRenderer } from 'react-notion-x';
import notion from '../utils/notion';

/**
 * @param {{ recordMap: import('notion-types').ExtendedRecordMap }} props
 */
export default function Page({ recordMap }) {
  const colorScheme = useColorScheme();

  if (!recordMap) return null;

  const title = getPageTitle(recordMap);

  const ogImageUrl = process.env.NEXT_PUBLIC_SITE_URL.concat(
    '/api/og-image?',
    'subtitle=',
    process.env.NEXT_PUBLIC_SITE_TITLE,
    '&title=',
    title,
    '&image=',
    process.env.NEXT_PUBLIC_SITE_FAVICON
  );

  return (
    <>
      <NextSeo
        defaultTitle={title}
        openGraph={{
          images: [
            {
              url: ogImageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <style global jsx>
        {
          /* css */ `
            :root {
              --notion-font: ${process.env.NEXT_PUBLIC_THEME_FONT_FAMILY}, system-ui, sans-serif;
              --select-color-0: ${process.env.NEXT_PUBLIC_THEME_PRIMARY_COLOR};
              --neutral-color: hsl(220, 8%, 25%);
            }
            .dark-mode {
              --bg-color: hsl(220, 8%, 8%);
              --bg-color-0: hsl(220, 8%, 15%);
              --bg-color-1: hsl(220, 8%, 20%);
              --bg-color-2: hsla(220, 8%, 10%, 0.15);
              --fg-color-0: var(--neutral-color);
              --fg-color-5: var(--neutral-color);
              --notion-blue_background_co: rgb(29, 40, 46);
              --notion-teal_background_co: rgb(34, 43, 38);
              --notion-yellow_background_co: rgb(57, 46, 30);
              --notion-purple_background_co: rgb(43, 36, 49);
              --notion-pink_background_co: rgb(48, 34, 40);
              --notion-red_background_co: rgb(54, 36, 34);
              --notion-orange_background_co: rgb(56, 40, 30);
              --notion-gray_background_co: rgb(37, 37, 37);
              --notion-brown_background_co: rgb(47, 39, 35);
            }
          `
        }
      </style>
      <NotionRenderer
        showTableOfContents
        components={{ nextImage: Image, nextLink: Link, Code }}
        darkMode={colorScheme === 'dark'}
        disableHeader={true}
        fullPage={true}
        recordMap={recordMap}
      />
    </>
  );
}

/**
 * @param {import('next').NextPageContext} context
 */
export async function getStaticProps(context) {
  let recordMap = null;

  /** @type String  */
  let pageId = context.params.pageId;
  if (pageId !== 'favicon.ico') {
    recordMap = await notion.getPage(pageId);
  }

  return {
    props: {
      recordMap,
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [],
    // Will server-render pages on-demand if the path doesn't exist.
    fallback: 'blocking',
  };
}

/**
 * Optional Components
 */

const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code), {
  ssr: false,
});
