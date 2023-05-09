import React from "react";
import styled from "styled-components";

import { IoLockClosedOutline } from "react-icons/io5";

const PrivateAccount = () => {
  return (
    <Container>
      <IoLockClosedOutline size="3rem" />
      <StyledDescription>This account is private</StyledDescription>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const StyledDescription = styled.p`
  margin: 1rem 0;
  font-size: 2rem;
`;

export default PrivateAccount;
