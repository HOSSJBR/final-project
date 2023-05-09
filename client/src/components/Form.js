import styled from "styled-components";
import { COLORS } from "../constants/colors";

export const Input = styled.input`
  background: transparent;
  color: #fff;
  border: 0;
  outline: 0;
  border-bottom: 2px solid ${COLORS.colorMain};
  padding-bottom: 0.3rem;
  &::placeholder {
    color: #eee;
    font-size: 1rem;
    background: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
    font-size: 1rem;
  }
  &[data-autocompleted] {
    font-size: 1rem;
    background-color: transparent !important;
  }
  font-size: 1rem;
  width: 100%;
  border-color: ${(props) => props.err && "#ff0000"};
  transition: border-color 0.3s ease;
`;
export const Label = styled.label`
  letter-spacing: 2px;
  color: #fff;
  text-transform: uppercase;
  display: block;
  font-weight: 300;
  font-size: 1rem;
  color: #b3b2b1;
`;
export const Button = styled.button`
  background: ${(props) => (props.isActive ? `${COLORS.buttonBg}` : `#4B5C72`)};
  color: ${(props) => props.isActive && `#FFF`};
  border: 0;
  font-size: 1.2rem;
  color: #fff;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  ${(props) => props.styles}
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const PasswordInput = styled(Input)``;
