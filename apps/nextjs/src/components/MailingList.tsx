import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { api } from "~/utils/api";

function MailingList() {
  const toast = useToast();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const { mutate: addToWaitlist } = api.discord.addToWaitlist.useMutation({
    onError: (error) => {
      console.error("Log from the front end", error);
      setIsError(true);
      setError(error.message);
    },
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
      toast({
        title: "Success",
        description: "You have been added to the waitlist.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    },
  });
  const [email, setEmail] = useState("");
  const onSubmit = () => {
    setIsError(false);
    console.log("submitting");
    addToWaitlist({ email: email });
  };

  return (
    <Stack direction={{ base: "column", md: "row" }} spacing={5}>
      <FormControl isInvalid={isError}>
        <Input
          type="email"
          placeholder="satoshinakamoto@gmail.com"
          value={email}
          onChange={(email) => setEmail(email.target.value)}
          size={"lg"}
        />

        {isError && <FormErrorMessage>{error}</FormErrorMessage>}
      </FormControl>
      <Button size={"lg"} px={10} onClick={onSubmit}>
        Join Waitlist
      </Button>
    </Stack>
  );
}

export default MailingList;
