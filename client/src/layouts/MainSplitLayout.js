import React from "react";
import styled from "styled-components";
import CenterLayout from "./CenterLayout";
import LeftLayout from "./LeftLayout";
import SplitLayout from "./SplitLayout";

import Background from "../assets/background.png";

const MainSplitLayout = ({ children }) => {
  return (
    <HomeContainer>
      <CenterLayout>
        <SplitLayout>
          <LeftLayout />
          {children}
        </SplitLayout>
      </CenterLayout>
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.6)),
    url(${Background}) center/cover no-repeat;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;
export default MainSplitLayout;
