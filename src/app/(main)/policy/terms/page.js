import React from "react";

const page = () => {
  return (
    <main className="flex flex-col items-center gap-20 my-10 md:my-36">
      {/* Header */}
      <section className="text-4xl md:text-7xl font-extrabold mx-4 md:mx-0 text-center">
        <h1>Terms and conditions</h1>
      </section>
      <section className="text-4xl md:text-7xl font-extrabold">
        <h2 className="text-lg md:text-4xl">Effective Date: [ May, 2024]</h2>
      </section>
      {/* Body */}
      <section className="md:w-[1200px] px-6 md:px-24 py-10 md:py-28 mx-4 md:mx-0 bg-[#F9F9F9] border-2 border-[#C6C6C6] rounded-2xl md:rounded-[40px] flex flex-col gap-6 md:gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-lg  text-[#797979]">
            These Terms and Conditions (&apos;Terms&apos;) govern your use of
            the photography services provided by Lisa Photos (&apos;we&apos; or
            &apos;us&apos;) and your use of our website. By engaging our
            photography services or accessing our website, you agree to be bound
            by these Terms. Please read these Terms carefully before using our
            services or website.
          </p>
          <h1 className="text-4xl font-extrabold">Photography Services</h1>
          <p className="text-lg  text-[#797979]">
            a. Booking: To schedule a photography session, you must contact us
            to check availability and book a date and time.
            <br />
            b. Payment: Payment for photography services is required at the time
            of booking. We accept payment online via Stripe payment gateway, and
            all major credit and debit cards are accepted.
            <br />
            c. Cancellations and Rescheduling: If you need to cancel or
            reschedule your photography session, please notify us at least
            24 hours in advance. A cancellation fee may apply if
            adequate notice is not provided.
            <br />
            d. Deliverables: We will deliver the final edited photographs to you
            on the same day, digital copy will take up to 3 days after the photography session, unless
            otherwise agreed upon.
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Online Payments</h1>
          <p className="text-lg  text-[#797979]">
            a. Payment Processor: We use a secure third-party payment processor
            to handle online payments. Your payment information is encrypted and
            processed securely.
            <br />
            b. Payment Authorization: By providing your payment information, you
            authorize us to charge the specified amount for the photography
            services requested.
            <br />
            c. Refunds: Refunds are issued in accordance with our cancellation
            policy. Refunds may take up to 5 business days to process and appear
            in your account.
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold flex flex-row items-center gap-2">
            Intellectual Property
          </h1>
          <p className="text-lg  text-[#797979]">
            a. Copyright: All photographs taken by us are the property of
            [Photography Business Name] and are protected by copyright laws. You
            may use the photographs for personal use only and may not reproduce,
            distribute, or sell the photographs without our permission.
            <br />
            b. Usage Rights: We grant you a non-exclusive, non-transferable
            license to use the photographs for personal use only. Commercial use
            of the photographs requires additional licensing and fees.
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold flex flex-row items-center gap-2">
            Liability
          </h1>
          <p className="text-lg  text-[#797979]">
            a. Limitation of Liability: We are not liable for any damages or
            losses arising from your use of our services or website, including
            but not limited to indirect, incidental, or consequential damages.
            <br />
            b. Indemnification: You agree to indemnify and hold us harmless from
            any claims, damages, or losses arising from your use of our services
            or website, including any breach of these Terms.
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Privacy</h1>
          <p className="text-lg  text-[#797979]">
            a. Privacy Policy: Our collection and use of personal information
            are governed by our Privacy Policy, which is incorporated into these
            Terms by reference. Please review our Privacy Policy for more
            information about how we collect, use, and protect your information.
            <br />
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Amendments</h1>
          <p className="text-lg  text-[#797979]">
            We reserve the right to modify or amend these Terms at any time. Any
            changes to these Terms will be effective immediately upon posting on
            our website. Your continued use of our services or website after the
            posting of changes constitutes your acceptance of the amended Terms.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-extrabold">Governing Law</h1>
          <p className="text-lg  text-[#797979]">
            These Terms are governed by the laws of Canada. Any disputes
            arising under these Terms shall be subject to the exclusive
            jurisdiction of Province of Ontario and Canadian law.
          </p>
        </div>
        If you have any questions or concerns about these Terms, please contact
        us at lisaphoto@mail.com.
        <br />
        <br />
        Thank you for choosing Lisa Photos. We look forward to capturing your
        special moments!
        <br />
      </section>
    </main>
  );
};

export default page;
