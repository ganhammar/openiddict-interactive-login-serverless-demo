import { useActionState } from "react";
import { Form } from "radix-ui";
import { Box, Button, TextField, Flex, Text, Callout } from "@radix-ui/themes";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [result, onSubmit, isPending] = useActionState(
    async (_: Record<string, string>, formData: FormData) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response = await fetch("/api/user/login", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return {
          error: `Oops! (Status: ${response.statusText})`,
        };
      }

      onLogin();
      return await response.json();
    },
    null
  );

  return (
    <Form.Root action={onSubmit}>
      <Box mb="4">
        <Form.Field name="email">
          <Flex justify="between">
            <Form.Label>Email</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <Text size="2">Please enter your email</Text>
            </Form.Message>
            <Form.Message className="FormMessage" match="typeMismatch">
              <Text size="2">Please provide a valid email</Text>
            </Form.Message>
          </Flex>
          <Form.Control asChild>
            <TextField.Root type="email" required></TextField.Root>
          </Form.Control>
        </Form.Field>
      </Box>
      <Box mb="4">
        <Form.Field name="password">
          <Flex justify="between">
            <Form.Label>Password</Form.Label>
            <Form.Message className="FormMessage" match="valueMissing">
              <Text size="2">Please enter your password</Text>
            </Form.Message>
          </Flex>
          <Form.Control asChild>
            <TextField.Root type="password" required></TextField.Root>
          </Form.Control>
        </Form.Field>
      </Box>
      {result?.error && (
        <Callout.Root color="red" mb="4">
          <Callout.Text>{result.error}</Callout.Text>
        </Callout.Root>
      )}
      <Flex justify="end">
        <Form.Submit asChild>
          <Button loading={isPending}>Login</Button>
        </Form.Submit>
      </Flex>
    </Form.Root>
  );
}
