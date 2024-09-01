import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../CheckoutForm/CheckoutForm";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const CheckoutWrapper = ({ onSuccess, onPaymentFailed, bookingDetes }) => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    // const familySampleItem = {
    //   items: [
    //     { id: "family" },
    //     { id: "single" },
    //     { id: "single" },
    //     { id: "single" },
    //   ],
    // };

    // const singleSampleItem = {
    //   items: [{ id: "single" }],
    // };

    // const multiSampleItem = {
    //   items: [{ id: "multi" }],
    // };

    axios
      .post("/api/payment/create-payment-intent", bookingDetes)
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => console.log(err));

    // fetch(, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(),
    // })
  }, [bookingDetes]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            onSuccess={onSuccess}
            onPaymentFailed={onPaymentFailed}
          />
        </Elements>
      )}
    </div>
  );
};

export default CheckoutWrapper;
