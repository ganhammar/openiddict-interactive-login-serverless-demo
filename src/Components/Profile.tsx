import { Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import { Label } from "radix-ui";
import { User } from "../types/user";

export function Profile({ user: { userName, email } }: { user: User }) {
  const ucFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Box>
      <Text weight="medium" size="4">
        Welcome back, {ucFirst(userName)}!
      </Text>
      <Box my="4">
        <Label.Root>Email</Label.Root>
        <TextField.Root type="email" disabled value={email}></TextField.Root>
      </Box>
      <Flex justify="end">
        <Button disabled>Update</Button>
      </Flex>
    </Box>
  );
}
