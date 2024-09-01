import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center gap-20 my-10 md:my-36">
      {/* Header */}
      <section className="text-4xl md:text-7xl font-extrabold">
        <h1>Privacy Policy</h1>
      </section>
      <section className="text-4xl md:text-7xl font-extrabold">
        <h2 className="text-lg md:text-4xl">Effective Date: [ May, 2024]</h2>
      </section>
      {/* Body */}
      <section className="md:w-[1200px] px-6 md:px-24 py-10 md:py-28 mx-4 md:mx-0 bg-[#F9F9F9] border-2 border-[#C6C6C6] rounded-2xl md:rounded-[40px] flex flex-col gap-6 md:gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-lg  text-[#797979]">LISA PHOTOS is committed to protecting the privacy of our clients and website visitors. This Privacy Policy outlines the types of personal information we collect, how we use it, and the choices you have regarding your information. By using our  services or accessing our website, you consent to the collection and use of your personal information as described in this policy.</p>
          <h1 className="text-4xl font-extrabold">Information We Collect</h1>
          <p className="text-lg  text-[#797979]">
           1. Personal Information: When you engage with our photography services or interact with our website, we may collect personal information such as your name, email address, postal address, phone number, and payment information.<br/>
           2. Photography Session Information: We may collect information about your photography session preferences, including the date, location, and desired outcomes.<br/>
           3. Photographs: We may collect photographs taken during photography sessions or submitted to us for editing or printing.<br/>
           4. Usage Information: We may collect information about your interactions with our website, such as the pages you visit, the features you use, and the actions you take.<br/>
           5. Device Information: We may collect information about the device you use to access our website, including your IP address, browser type, operating system, and device identifiers.<br/>
           6. Cookies and Similar Technologies: We use cookies and similar technologies to collect information about your browsing activities and preferences.<br/>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">How We Use Your Information</h1>
          <p className="text-lg  text-[#797979]">
           1. To Provide Photography Services: We use your personal information to provide the photography services you request, including scheduling sessions, editing photographs, and delivering final products.<br/>
           2. To Communicate with You: We may use your contact information to communicate with you about your photography session, provide updates, and respond to inquiries.<br/>
           3. To Improve Our Services: We analyze usage data and client feedback to improve the quality of our photography services and customer experience.<br/>
           4. Marketing and Promotions: With your consent, we may use your information to send you marketing communications about our services, promotions, and special offers.<br/>
           5. Legal Compliance: We may use your information to comply with legal obligations, resolve disputes, and enforce our agreements.<br/>
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold flex flex-row items-center gap-2">
            Information Sharing
          </h1>
          <p className="text-lg  text-[#797979]">
            We do not sell, trade, or rent your personal information to third parties for their marketing purposes. We may share your information with service providers who assist us in operating our business or providing services to you. We may also disclose your information in response to legal requests or to protect our rights, property, and safety, or the rights, property, and safety of others.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold flex flex-row items-center gap-2">
            Data Security
          </h1>
          <p className="text-lg  text-[#797979]">
            We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Your Choices</h1>
          <p className="text-lg  text-[#797979]">
            You can choose not to provide certain personal information, but this may limit your ability to use certain features of our services or website. You can also opt out of receiving marketing communications from us by following the instructions provided in the communication.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Accessing and Updating Your Information</h1>
          <p className="text-lg  text-[#797979]">
            You have the right to access and update your personal information held by us. If you would like to access or update your information, please contact us using the contact information provided below.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Changes to this Policy</h1>
          <p className="text-lg  text-[#797979]">
            You can choose not to provide certain personal information, but this may limit your ability to use certain features of our services or website. You can also opt out of receiving marketing communications from us by following the instructions provided in the communication.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Contact Us</h1>
          <p className="text-lg  text-[#797979]">
            If you have any questions or concerns about this Privacy Policy, or if you would like to exercise your rights regarding your personal information, please contact us at : lisaphoto@mail.com
          </p>
        </div>
        Thank you for choosing Lisa photos. We value your privacy and trust.
      </section>
    </main>
  );
};

export default page;
