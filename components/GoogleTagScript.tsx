import Script from 'next/script';

/** Google Ads Tag — inert until NEXT_PUBLIC_GOOGLE_TAG_ID is set (portfolio pattern). */
export default function GoogleTagScript() {
  if (!process.env.NEXT_PUBLIC_GOOGLE_TAG_ID) {
    return null;
  }
  return (
    <>
      <Script
        id="google-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-tag-config" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_TAG_ID}');
        `}
      </Script>
    </>
  );
}
