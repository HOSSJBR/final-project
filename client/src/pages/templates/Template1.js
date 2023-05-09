import React from "react";
import styled from "styled-components";

import moment from "moment";
import FlexColumn from "../../layouts/FlexColumn";
import FlexRow from "../../layouts/FlexRow";
import MapStateToElements from "../editor/MapStateToElements";

const Template1 = ({ user, data, color, docRef }) => {
  const elements = MapStateToElements(data);

  return (
    <Container ref={docRef}>
      <Header
        style={{
          background: `${color}`,
        }}
      >
        <FlexRow styles={{ gap: "0.5rem" }}>
          <StyledImage src={user.imageLinks.url} alt="ResumeProfile" />
          <FlexColumn gap={"1rem"}>
            {elements.name}

            <h2 style={{ fontWeight: "300" }}>
              Seeking a <b>{user.category} </b> Job
            </h2>

            <FlexRow styles={{ marginTop: "1rem" }}>
              {elements.location}
            </FlexRow>
            <FlexRow styles={{ marginTop: "0.5rem" }}>
              <p>{data.phone}</p>
              <b>.</b>
              <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
                {data.email}
              </p>
            </FlexRow>
          </FlexColumn>
        </FlexRow>
      </Header>

      <Body>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {data.dob && <FlexColumn gap={"0.3rem"}>{elements.dob}</FlexColumn>}
          {data.nationality && (
            <FlexColumn gap={"0.3rem"}>{elements.nationality}</FlexColumn>
          )}
          <FlexColumn gap={"0.3rem"}>{elements.license}</FlexColumn>
          <FlexColumn gap={"0.3rem"}>{elements.hobbies}</FlexColumn>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <div>{elements.profile}</div>
            <Title>Employment History</Title>

            {elements.employment.map((emp, index) => (
              <FlexColumn gap={"0.2rem"} key={index}>
                <p>
                  <b>
                    {emp.jobTitle} {emp.jobTitle && emp.employer && ", "}
                    {emp.employer}
                  </b>
                </p>
                {emp.startDate && emp.endDate && (
                  <p>
                    {moment(emp.startDate).format("MMMM YYYY")} -{" "}
                    {moment(emp.endDate).format("MMMM YYYY")}
                  </p>
                )}
                <p>{emp.description}</p>
              </FlexColumn>
            ))}

            <Title>Education History</Title>

            {elements.education.map((emp, index) => (
              <FlexColumn key={index} gap={"0.2rem"}>
                <p>
                  <b>
                    {emp.school} {emp.school && emp.degree && ", "} {emp.degree}
                  </b>
                </p>
                {emp.startDate && emp.endDate && (
                  <p>
                    {moment(emp.startDate).format("MMMM YYYY")} -{" "}
                    {moment(emp.endDate).format("MMMM YYYY")}
                  </p>
                )}
                <p>{emp.description}</p>
              </FlexColumn>
            ))}
          </div>
        </div>
      </Body>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 1rem;
`;
const StyledImage = styled.img`
  height: 100%;
`;

const Container = styled.div`
  padding: 1rem;
  font-size: 10px;
  height: 100%;
`;
const Header = styled.div`
  padding: 1rem;
  border-radius: 3px;
  font-size: 0.8rem;
  color: #fff;
  fontfamily: "Noto Sans";
  fontweight: 300;
`;

const Body = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-columns: 1fr 2fr;
  word-break: break-word;
`;
export default Template1;
