import { useRouter } from "next/router";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const PaymentSucceededPage = () => {
  const router = useRouter();

  const handleReturnHomeClick = () => {
    router.push("/");
  };

  return (
    <Box
      bg="black"
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        bg="#bc9d2e"
        p={4}
        rounded="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        mb={4}
      >
        <Heading color="white">Payment Succeeded</Heading>
      </Box>
      <Box
        bg="white"
        p={6}
        rounded="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        boxShadow="md"
      >
        <Text fontSize="lg" color="black" mb={4}>
          Thank you for your purchase!
        </Text>
        <Button colorScheme="brand" size="lg" onClick={handleReturnHomeClick}>
          Return to Home Page
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentSucceededPage;
