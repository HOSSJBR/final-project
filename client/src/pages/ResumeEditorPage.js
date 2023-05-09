import React from "react";

import styled from "styled-components";

import EditorComponent from "./editor/EditorComponent";
import PreviewResume from "./editor/PreviewResume";

const ResumeEditorPage = () => {
  return (
    <ProfileContainer>
      <EditorComponent />
      <PreviewResume />
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-auto-rows: calc(100vh - 50px);
  }
`;

export default ResumeEditorPage;
