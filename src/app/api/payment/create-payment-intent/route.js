import currency from "currency.js";
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const calculateOrderAmount = (bookingDetes) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client

  const getPackageAmount = () => {
    return bookingDetes.package === "single"
      ? currency(14.99)
      : bookingDetes.package === "family"
      ? currency(49.99)
      : currency(24.99);
  };
  const getAddonsAmount = () => {
    return bookingDetes.package === "multi"
      ? currency(14.99).multiply(bookingDetes.addon)
      : currency(14.99).multiply(bookingDetes.addon);
  };

  

  const getDigitalCopiesAmount = () => {
    return bookingDetes.package === "single"
      ? currency(9.99).add(currency(9.99).multiply(bookingDetes.addon))
      : bookingDetes.package === "family"
      ? currency(39.96).add(currency(9.99).multiply(bookingDetes.addon))
      : currency(19.98).add(currency(19.98).multiply(bookingDetes.addon));
  };

  const getSubtotal = () => {
    if (bookingDetes.digitalCopies)
      return getPackageAmount().add(getAddonsAmount()).add(getDigitalCopiesAmount());
    else return getPackageAmount().add(getAddonsAmount());
  };

  const getTaxAmount = () => {
    return currency(getSubtotal(), { increment: 0.01 }).multiply(0.13);
  };

  const getTotal = () => {
    return getSubtotal().add(getTaxAmount());
  };

  const baseAmount =
    bookingDetes.package === "single"
      ? 1499
      : bookingDetes.package === "family"
      ? 4999
      : 2499;

  const addonsAmount =
    bookingDetes.package === "multi"
      ? bookingDetes.addon * 1499
      : bookingDetes.addon * 1499;

  console.log(getTotal().format());
  console.log(getTotal().intValue);

  return getTotal().intValue;
};

export async function POST(req) {
  const bookingDetes = await req.json();

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(bookingDetes),
    currency: "cad",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return Response.json({ clientSecret: paymentIntent.client_secret });
}
