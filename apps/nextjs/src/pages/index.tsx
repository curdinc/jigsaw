import React, { useEffect } from "react";
import { type NextPage } from "next";
import Head from "next/head";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, type Stripe } from "@stripe/stripe-js";

import CheckoutForm from "~/components/stripe/CheckoutForm";
import { env } from "~/env.mjs";

const Home: NextPage = () => {
  const [clientSecret, setClientSecret] = React.useState("");
  const [stripePromise, setStripePromise] = React.useState<Stripe | null>(null);
  const {
    isOpen: isOpenPaymentModal,
    onOpen: onOpenPaymentModal,
    onClose: onClosePaymentModal,
  } = useDisclosure();

  const createPaymentIntent = async () => {
    if (clientSecret !== "") {
      console.log("clientSecret cached");
      return;
    }

    console.log(
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      typeof env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );

    const stripePromise = await loadStripe(
      env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (stripePromise === null) {
      throw new Error("Invalid stripe promise.");
    }
    setStripePromise(stripePromise);

    await fetch("/api/stripe/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data: { clientSecret: string }) => {
        setClientSecret(data.clientSecret);
      });
  };

  useEffect(() => {
    if (clientSecret !== "") {
      onOpenPaymentModal();
    }
  }, [clientSecret]);

  const appearance = {
    theme: "stripe",
  };

  return (
    <>
      <Head>
        <title>Jigsaw</title>
      </Head>
      <Button onClick={createPaymentIntent}>Buy Now</Button>
      <Modal isOpen={isOpenPaymentModal} onClose={onClosePaymentModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Elements
              options={{ clientSecret, appearance }}
              stripe={stripePromise}
            >
              <CheckoutForm />
            </Elements>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClosePaymentModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
