// Google Analytics Script
// Uncomment and replace GA_MEASUREMENT_ID with your actual Google Analytics ID
// Example: G-XXXXXXXXXX

/*
import Script from 'next/script';

export function GoogleAnalytics() {
  const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your GA ID

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
*/

// Placeholder component (does nothing until uncommented above)
export function GoogleAnalytics() {
  return null;
}
