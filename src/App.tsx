import { use, useState } from 'react';
import { Box, Flex, Heading } from '@radix-ui/themes';
import styled from 'styled-components';
import User from './Types/User';
import Login from './Components/Login';
import Profile from './Components/Profile';

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

const checkUser = async (): Promise<User | null> => {
  const res = await fetch('/api/user/current');

  if (res.ok) {
    return await res.json();
  }

  return null;
};

const checkUserPromise = checkUser();

function App() {
  const [promise, updatePromise] = useState(checkUserPromise);

  const update = () => {
    updatePromise(checkUser());
  };

  return (
    <Main loadingPromise={promise} update={update} />
  );
}

function Main({ loadingPromise, update }: { loadingPromise: Promise<User | null>, update: () => void }) {
  const user = use<User | null>(loadingPromise);

  return (
    <MainBox width="400px" p="5">
      <Flex justify="center">
        <MainHeading as="h1">Login</MainHeading>
      </Flex>
      {user ? <Profile user={user} /> : <Login onLogin={update} />}
    </MainBox>
  );
}

export default App;