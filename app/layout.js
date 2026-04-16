import "./globals.css";
import Script from "next/script";
import ConsentBanner from "@/components/ConsentBanner";

export const metadata = {
  title: "ViennaUP Event Map",
  description: "Interactive map of ViennaUP programme events"
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ERK6DHM8F6";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        {GA_ID ? <ConsentBanner /> : null}
      </body>
      {GA_ID ? (
        <>
          <Script id="google-consent-defaults" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
            `}
          </Script>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics-config" strategy="afterInteractive">
            {`
              gtag('config', '${GA_ID}', {
                send_page_view: true
              });
            `}
          </Script>
        </>
      ) : null}
    </html>
  );
}
