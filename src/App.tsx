import { use, useState } from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import styled from "styled-components";
import { Login } from "./Components/Login";
import { Profile } from "./Components/Profile";
import { checkUser } from "./utils/checkUser";

const MainBox = styled(Box)`
  background-color: ${({ theme }) => theme.colors.gray1};
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-3);
`;

const MainHeading = styled(Heading)`
  font-family: Pacifico;
  color: ${({ theme }) => theme.colors.gray11};
  margin: 0 0 var(--space-5) 0;
`;

const checkUserPromise = checkUser();

export function App() {
  const [promise, updatePromise] = useState(checkUserPromise);
  const user = use(promise);

  const update = () => {
    updatePromise(checkUser());
  };

  return (
    <MainBox width="400px" p="5">
      <Flex justify="center">
        <MainHeading as="h1">Login</MainHeading>
      </Flex>
      {user ? <Profile user={user} /> : <Login onLogin={update} />}
    </MainBox>
  );
}
