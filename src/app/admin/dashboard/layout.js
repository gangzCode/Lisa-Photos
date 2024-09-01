import "../../globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import { HeaderMobile } from "@/components/Header/HeaderMobile";
import AdminDashboardNav from "@/components/admin/adminDashboardNav/AdminDashboardNav";
import { getSession } from "@/utils/admin_auth/session/Session";
import { redirect } from "next/navigation";

// import bcrypt from "bcrypt";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lisa Photos",
  description: "Precise Identity with Lisa Photos",
};
export const dynamic = "force-dynamic";

export default async function MainLayout({ children }) {
  const session = await getSession();

  // console.log("Dashboard page", await session);

  if (session === null) redirect("/admin/login");

  return (
    <div>
      <div className="flex flex-row h-screen bg-[#F6F6F6]">
        <div className="">
          <AdminDashboardNav />
        </div>
        {children}
      </div>
      <Footer />
    </div>
  );
}
