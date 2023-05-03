import React from "react";
import { Button, FormControl, useToast } from "@chakra-ui/react";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const toast = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      console.error("clientSecret undefined in checkout form");
      return;
    }

    console.error("obtained clientSecret.");
    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          console.error("paymentIntent undefined in checkout form");
          return;
        }
        switch (paymentIntent.status) {
          case "succeeded":
            toast({
              title: "Payment succeeded!",
              description: "Thanks for your support!",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            break;
          case "processing":
            toast({
              title: "Loading",
              description: "Your payment is processing.",
              status: "info",
              duration: 9000,
              isClosable: true,
            });
            break;
          case "requires_payment_method":
            toast({
              title: "Error",
              description: "Your payment was not successful, please try again.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            break;
          default:
            toast({
              title: "Error",
              description: "Something went wrong.",
              status: "error",
              duration: 9000,
              isClosable: true,
            });
            break;
        }
      })
      .catch((error) => console.error(error));
  }, [stripe, toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/paymentSuccess",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error?.type === "card_error" || error?.type === "validation_error") {
      if (error.message) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.error(error);
      }
    } else {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    setIsLoading(false);
  };

  // const paymentElementOptions = {
  //   layout: "tabs",
  // };

  return (
    <form
      id="payment-form"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e)
          .then(() => {
            // handle successful completion of asynchronous operation
          })
          .catch(() => {
            // handle error from asynchronous operation
          });
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <FormControl id="email">
          <LinkAuthenticationElement id="link-authentication-element" />
        </FormControl>

        <FormControl id="payment-element">
          <PaymentElement />
        </FormControl>

        <Button
          type="submit"
          className="align-center mt-4"
          disabled={isLoading || !stripe || !elements}
          id="submit"
          colorScheme={"brand"}
        >
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </Button>
      </div>
    </form>
  );
}
