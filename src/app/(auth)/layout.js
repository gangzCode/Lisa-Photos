import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lisa Photos",
  description: "Precise Identity with Lisa Photos",
};

export default function MainLayout({ children }) {
  return <div className={inter.className}>{children}</div>;
}
