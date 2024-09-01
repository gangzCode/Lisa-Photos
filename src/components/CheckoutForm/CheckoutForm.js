import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, CircularProgress } from "@mui/material";
import { useUser } from "@auth0/nextjs-auth0/client";

const CheckoutForm = ({ onSuccess, onPaymentFailed }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, error, userLoading } = useUser();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    await stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/booking?success=true",
          receipt_email: user.email,
        },
      })
      .then((result) => {
        console.log(result);
        if (result.error) {
          // Inform the customer that there was an error.
          if (
            result.error.type === "card_error" ||
            result.error.type === "validation_error"
          ) {
            setMessage(result.error.message);
            onPaymentFailed();
          } else {
            setMessage("An unexpected error occurred.");
            onPaymentFailed();
          }
        } else if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            onSuccess(true);
          }
        }
      });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    // const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
    // if (paymentIntent && paymentIntent.status === "succeeded") {
    //   // Handle successful payment here
    //   onSuccess();
    // } else {
    //   // Handle unsuccessful, processing, or canceled payments and API errors here
    // }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <div className="flex flex-col gap-4">
      <form
        id="payment-form"
        className="flex flex-col items-center gap-4 border-2 border-neutral-400 p-8 rounded-xl"
        onSubmit={handleSubmit}
      >
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <Button
          disabled={isLoading || !stripe || !elements}
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
          }}
        >
          <span id="button-text">
            {isLoading ? <CircularProgress /> : "Pay now"}
          </span>
        </Button>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-4 w-full items-center">
          <div className="flex-1 border border-neutral-400 h-0"></div>
          <p className="mx-2 text-xl"> OR </p>
          <div className="flex-1 border border-neutral-400 h-0"></div>
        </div>
        <Button
          disabled={isLoading}
          // type="submit"
          variant="contained"
          sx={{
            width: "100%",
          }}
          onClick={() => {
            setIsLoading(true);
            onSuccess(false);
          }}
        >
          <span id="button-text">
            {isLoading ? <CircularProgress /> : "Pay Later"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
