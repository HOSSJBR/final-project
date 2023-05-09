import React from "react";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import styled from "styled-components";
import FlexColumn from "../../layouts/FlexColumn";
import FlexRow from "../../layouts/FlexRow";
import MapStateToElements from "../editor/MapStateToElements";

const Template2 = ({ user, data, color, docRef }) => {
  const elements = MapStateToElements(data);

  return (
    <Layout ref={docRef}>
      <Info>
        <div
          style={{
            margin: "1rem 0 0 0.5rem",
            position: "relative",
          }}
        >
          <img
            width={150}
            height={150}
            style={{
              borderRadius: "50%",
              border: "8px solid #000",
              zIndex: 12,
              position: "relative",
            }}
            src={user.imageLinks.url}
            alt=""
          />
          <Header style={{ background: `${color}` }}>
            {elements.name}
            <p>{user.category}</p>
          </Header>
          <p>{data.summary}</p>
        </div>

        <Body>
          <div>
            <Title style={{ background: `${color}` }}>Education</Title>
            <FlexRow>
              <Wrapper>
                {data.education.map((edu, index) => (
                  <FlexRow
                    key={index}
                    styles={{ gap: "1rem", marginBottom: "1rem" }}
                  >
                    <p style={{ fontSize: "12px" }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <FlexColumn gap={"0.2rem"}>
                      <h1>
                        {edu.degree} at {edu.school}
                      </h1>
                      <p>{edu.description}</p>
                    </FlexColumn>
                  </FlexRow>
                ))}
              </Wrapper>
            </FlexRow>
          </div>
          <div>
            <Title style={{ background: `${color}` }}>Employment</Title>
            <FlexRow>
              <Wrapper>
                {data.employment.map((edu, index) => (
                  <FlexRow
                    key={index}
                    styles={{ gap: "1rem", marginBottom: "1rem" }}
                  >
                    <p style={{ fontSize: "12px" }}>
                      {edu.startDate} - {edu.endDate}
                    </p>
                    <FlexColumn gap={"0.2rem"}>
                      <h1>
                        {edu.jobTitle} at {edu.employer}
                      </h1>
                      <p>{edu.description}</p>
                    </FlexColumn>
                  </FlexRow>
                ))}
              </Wrapper>
            </FlexRow>
          </div>
        </Body>
      </Info>
      <Details>
        <Centered>
          <div>
            <div>
              <h1
                style={{
                  border: `1px solid ${color}`,
                  padding: "1rem 2rem",
                  marginBottom: "1rem",
                }}
              >
                Contact Me
              </h1>
            </div>

            <FlexColumn gap={"2rem"}>
              <FlexRow styles={{ gap: "0.5rem" }}>
                <CiLocationOn color={color} size={20} />
                <div>{elements.location}</div>
              </FlexRow>
              <FlexRow styles={{ gap: "0.5rem", alignItems: "center" }}>
                <AiOutlineMail color={color} size={20} />
                <div style={{ fontSize: "12px" }}>{elements.email}</div>
              </FlexRow>
              <FlexRow styles={{ gap: "0.5rem", alignItems: "center" }}>
                <AiOutlinePhone color={color} size={20} />
                <div style={{ fontSize: "15px" }}>{elements.phone}</div>
              </FlexRow>
            </FlexColumn>

            <div style={{ paddingTop: "2rem" }}>{elements.hobbies}</div>
          </div>
        </Centered>
      </Details>
    </Layout>
  );
};

const Info = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  position: absolute;
  content: "";
  top: 30%;
  left: 0;
  right: 0;
  width: 90%;
  margin-left: auto;
  height: fit-content;
  padding: 0.5rem;
  text-align: right;
  color: #fff;
`;

const Title = styled.h1`
  text-align: right;
  color: #fff;
  padding: 1rem 0.5rem;
  width: 85%;
`;

const Body = styled.div`
  margin-top: 3rem;
`;

const Wrapper = styled.div`
  color: #000;
  margin: 1rem 0.5rem;
`;
const Centered = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Layout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  height: 100%;
  word-break: break-word;
`;

const Details = styled.div`
  background: #000;
  color: #fff;
  padding: 0 0.5rem;
  height: 100%;
`;
export default Template2;
