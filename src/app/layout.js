import { Poppins } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
// import db from '@/utils/db/db'
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Lisa Photos",
  description: "Precise Identity with Lisa Photos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
          <Script
            async src="https://www.googletagmanager.com/gtag/js?id=G-YCZ4ZXZECN"
          />

          <Script id="google-analytics">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
            `}
          </Script>
      </head>
      <UserProvider>
        <body className={poppins.className}>{children}</body>
      </UserProvider>
    </html>
  );
}
