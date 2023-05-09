import React from "react";
import styled from "styled-components";

const ResumeInput = ({ ...rest }) => {
  return <StyledInput {...rest} />;
};

const StyledInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background: #eff2f9;
  padding: 0.75rem 1.256rem;
  border-radius: 3px;
  margin-top: 1rem;
  font-size: 1.2rem;

  border-bottom: 3px solid transparent;
  transition: border-bottom 0.3s ease-out;

  &:focus {
    border-bottom: 3px solid #1a91f0;
  }

  &::placeholder {
    color: #c9c9c9;
  }
`;
export default ResumeInput;
