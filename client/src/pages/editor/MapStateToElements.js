import React from "react";

const MapStateToElements = (data) => {
  const elements = {};
  elements.name = <h1>{data.fname + " " + data.lname}</h1>;

  elements.employment = data.employment;
  elements.education = data.education;

  elements.location = (
    <>
      <h1>{data.address},</h1>
      <h1>{data.city},</h1>
      <h1>{data.postalCode},</h1>
      <h1>{data.country}</h1>
    </>
  );
  elements.license = (
    <>
      <h2>Driving License</h2>
      <p>{data.license}</p>
    </>
  );

  elements.phone = <p>{data.phone}</p>;
  elements.email = <p>{data.email}</p>;

  elements.contactInfo = (
    <>
      <b>.</b>
      <p style={{ textDecoration: "underline", fontWeight: "bold" }}>
        {data.email}
      </p>
    </>
  );

  elements.dob = (
    <>
      <h2>Date of birth</h2>
      <p>{data.dob}</p>
    </>
  );

  elements.nationality = (
    <>
      <h2>Nationality</h2>
      <p>{data.nationality}</p>
    </>
  );

  elements.profile = (
    <>
      <h1>Profile</h1>
      <p>{data.summary}</p>
    </>
  );
  elements.hobbies = (
    <>
      <h1>Hobbies</h1>
      <p>{data.hobbies}</p>
    </>
  );

  return elements;
};

export default MapStateToElements;
