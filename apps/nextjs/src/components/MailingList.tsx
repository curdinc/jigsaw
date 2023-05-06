import { useState } from "react";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { api } from "~/utils/api";

function MailingList() {
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
    },
  });
  const [email, setEmail] = useState("");
  const onSubmit = () => {
    setIsError(false);
    console.log("submitting");
    addToWaitlist({ email: email });
  };

  return (
    <>
      <h2
        id={"waitlist"}
        className="my-3 text-2xl font-bold text-gray-100 md:text-3xl"
      >
        Join The Wait List Now
      </h2>
      <FormControl isInvalid={isError}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          placeholder="satoshinakamoto@gmail.com"
          value={email}
          onChange={(email) => setEmail(email.target.value)}
        />
        {!isError ? (
          <FormHelperText>
            Enter the email you&apos;d like to receive the newsletter on.
          </FormHelperText>
        ) : (
          <FormErrorMessage>{error}</FormErrorMessage>
        )}
      </FormControl>
      <Button onClick={onSubmit}>Submit</Button>
    </>
  );
}

export default MailingList;
