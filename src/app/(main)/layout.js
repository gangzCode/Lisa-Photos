import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/footer/Footer";
import { HeaderMobile } from "@/components/Header/HeaderMobile";
import client from "@/utils/db/db";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";
import NewUserRedirctor from "@/components/NewUserRedirector/NewUserRedirctor";
// import bcrypt from "bcrypt";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lisa Photos",
  description: "Precise Identity with Lisa Photos",
};

// const saltRounds = 10;
// const myPlaintextPassword = "password";
// const someOtherPlaintextPassword = "not_bacon";

// bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
//   // Store hash in your password DB.
//   console.log(hash);
// });

export default async function MainLayout({ children }) {
  // const session = await getSession();
  // redirect("/profile");
  // const checkNewUser = async () => {
  //   const dbClient = client;

  //   try {
  //     dbClient.connect();

  //     const user = await dbClient
  //       .db("lisa-test")
  //       .collection("users")
  //       .findOne({ email: session?.user.email });

  //     if (user === null) console.log(user);

  //     if (user === null) redirect("/contact");
  //   } catch (error) {
  //   } finally {
  //     dbClient.close();
  //   }
  // };
  // await checkNewUser();
  return (
    <div>
      <Header />
      <HeaderMobile />
      {children}
      <Footer />
    </div>
  );
}
