import React, { useState } from "react";
import { AiOutlineLeft } from "react-icons/ai";
import { BiSelectMultiple } from "react-icons/bi";
import { FcCheckmark } from "react-icons/fc";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  storeResumeColor,
  storeResumeTemplate,
} from "../../actions/resumeActions";
import { widthKeyFrame } from "../../animations/animations";

const Sidebar = ({ children, goBack }) => {
  const dispatch = useDispatch();

  const [currentColor, setCurrentColor] = useState();
  const [templateOption, setTemplateOption] = useState();

  const templates = [1, 2];
  const colors = ["#EFC050", "#FF6F61", "#6B5B95", "#88B04B", "#DD4124"];

  const onColorClick = (color) => {
    setCurrentColor(color);
    dispatch(storeResumeColor(color));
  };

  return (
    <Container>
      <Content>
        <Toolbar>
          <BackButton onClick={goBack}>
            <AiOutlineLeft />
            Go Back To Editor
          </BackButton>
          <ColorsContainer>
            {colors.map((hex, index) => (
              <SingleColor
                key={index}
                background={hex}
                onClick={() => onColorClick(hex)}
              />
            ))}
          </ColorsContainer>
        </Toolbar>
        {currentColor && (
          <Selected>
            <p style={{ color: "#FFF" }}>
              <BiSelectMultiple />
            </p>
            <SingleColor background={currentColor} />
          </Selected>
        )}
        <TemplateOptions>
          <Heading>Choose a template</Heading>

          <TemplateContainer>
            {templates.map((num, index) => (
              <Template
                onClick={() => {
                  setTemplateOption(num);
                  dispatch(storeResumeTemplate(num));
                }}
                background={currentColor}
                key={index}
              >
                <p>{num}</p>
                <p style={{ display: "block" }}>
                  {templateOption === num && <FcCheckmark />}
                </p>
              </Template>
            ))}
          </TemplateContainer>
        </TemplateOptions>
      </Content>
    </Container>
  );
};

const Heading = styled.h1`
  color: #fff;
  font-size: 4rem;
  text-transform: uppercase;
  font-weight: 300;
`;
const TemplateOptions = styled.div`
  margin-top: 3rem;
`;
const TemplateContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin: 2rem 0;
`;

const Template = styled.div`
  background: #fff;
  width: 100px;
  height: 100px;
  border-radius: 3px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }

  box-shadow: 0 3px 7px 4px ${(props) => props.background}a9;

  & p {
    color: ${(props) => props.background};
  }
`;

const BackButton = styled.button`
  background: none;
  unset: all;
  color: #fff;
  border: none;
  outline: none;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  transition: opacity 0.3s ease;
  &:hover {
    opacity: 0.7;
  }
`;

const Selected = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  gap: 1rem;
  margin: 2rem 0;
  button {
    &: focus {
      border: none;
    }
  }
`;
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SingleColor = styled.button`
  height: 30px;
  width: 30px;
  outline: none;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: ${(props) => props.background};

  &:focus {
    border: 1px solid #fff;
  }
`;
const ColorsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const Container = styled.div`
  position: fixed;
  content: "";
  top: 0;
  left: 0;
  width: 100%;
  transition: width 0.4s ease;
  animation: ${widthKeyFrame} 0.3s ease forwards;
  z-index: 999;
  background: #000;
  height: 100%;
`;

const Content = styled.div`
  text-align: center;
  padding: 0.5rem;
`;

export default Sidebar;
