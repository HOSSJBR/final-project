import React from "react";
import styled from "styled-components";

const FlexRow = ({ children, styles }) => {
  return <FlexRowContainer styles={styles}>{children}</FlexRowContainer>;
};

const FlexRowContainer = styled.div`
  display: flex;
  flex-direction: row;
  ${(props) => props.styles}
`;

export default FlexRow;
