import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import axios from "axios";

import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { storeResumeData } from "../../actions/resumeActions";
import ResumeInput from "../../components/ResumeInput";
import ResumeLabel from "../../components/ResumeLabel";
import ResumeTitle from "../../components/ResumeTitle";

import moment from "moment";

import { AiOutlineArrowDown } from "react-icons/ai";

import { toast } from "react-toastify";

const StyledTextArea = styled.textarea`
  background: #eff2f9;
  resize: none;
  width: 100%;
  border: none;
  font-size: 1.2rem;
  box-shadow: none;
  padding: 1rem;
  border-radius: 3px;
`;

const initialFormState = {
  fname: "",
  lname: "",
  phone: "",
  email: "",
  country: "",
  city: "",
  address: "",
  postalCode: "",
  dob: "",
  hobbies: "",
  nationality: "",
  license: "",
};
const EditorComponent = () => {
  const dispatch = useDispatch();
  const onMount = useRef(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    ...initialFormState,
  });

  const [employment, setEmployment] = useState([]);
  const [education, setEducation] = useState([]);

  const handleChange = (e) => {
    const newForm = { ...formData, [e.target.name]: e.target.value };
    setFormData(newForm);
  };

  const handleRemoveEmployment = (e, key) => {
    const newEmployment = [...employment];
    newEmployment.splice(key, 1);
    setEmployment(newEmployment);
  };
  const handleRemoveEducation = (e, key) => {
    const newEducation = [...education];
    newEducation.splice(key, 1);
    setEducation(newEducation);
  };

  const handleEmploymentChange = (e, index) => {
    const newEmployment = [...employment];
    const clicked = newEmployment[index];
    clicked[e.target.name] = e.target.value;
    setEmployment(newEmployment);
  };

  const handleEducationChange = (e, index) => {
    const newEducation = [...education];
    const clicked = newEducation[index];
    clicked[e.target.name] = e.target.value;
    setEducation(newEducation);
  };

  const renderEmploymentHistory = () => {
    return (
      employment.length !== 0 &&
      employment.map((emp, index) => {
        return (
          <AccordionContainer key={index}>
            <Accordion
              style={{
                width: "100%",
                border: "1px solid #656e83",
                outline: "none",
              }}
            >
              <AccordionSummary expandIcon={<AiOutlineArrowDown />}>
                <div style={{}}>
                  <h1>{emp.jobTitle || "(Not Specified)"}</h1>

                  <StyledDate>
                    {emp.startDate && moment(emp.startDate).format("MMMM YYYY")}
                    -{emp.endDate && moment(emp.endDate).format("MMMM YYYY")}
                  </StyledDate>
                </div>
              </AccordionSummary>
              <StyledAccordionDetails>
                <div>
                  <ResumeLabel>Job Title</ResumeLabel>
                  <ResumeInput
                    value={emp.jobTitle}
                    name="jobTitle"
                    onChange={(e) => handleEmploymentChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Employer</ResumeLabel>
                  <ResumeInput
                    value={emp.employer}
                    name="employer"
                    onChange={(e) => handleEmploymentChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Start Date</ResumeLabel>
                  <ResumeInput
                    type="month"
                    value={emp.startDate}
                    name="startDate"
                    onChange={(e) => handleEmploymentChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>End Date</ResumeLabel>
                  <ResumeInput
                    type="month"
                    value={emp.endDate}
                    name="endDate"
                    onChange={(e) => handleEmploymentChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Description</ResumeLabel>
                  <ResumeInput
                    type="text"
                    value={emp.description}
                    name="description"
                    onChange={(e) => handleEmploymentChange(e, index)}
                  />
                </div>
              </StyledAccordionDetails>
            </Accordion>
            <ButtonRemoveEmployment
              type="button"
              onClick={(e) => handleRemoveEmployment(e, index)}
            >
              <FiTrash size={"1.5rem"} />
            </ButtonRemoveEmployment>
          </AccordionContainer>
        );
      })
    );
  };
  const renderEducationHistory = () => {
    return (
      education.length !== 0 &&
      education.map((edu, index) => {
        return (
          <AccordionContainer key={index}>
            <Accordion
              style={{
                width: "100%",
                border: "1px solid #656e83",
                outline: "none",
              }}
            >
              <AccordionSummary expandIcon={<AiOutlineArrowDown />}>
                <div>
                  <h1>
                    {(edu.degree &&
                      edu.school &&
                      `${edu.degree} at ${edu.school}`) ||
                      "(Not Specified)"}
                  </h1>

                  <StyledDate>
                    {edu.startDate && moment(edu.startDate).format("MMMM YYYY")}
                    -{edu.endDate && moment(edu.endDate).format("MMMM YYYY")}
                  </StyledDate>
                </div>
              </AccordionSummary>
              <StyledAccordionDetails>
                <div>
                  <ResumeLabel>School</ResumeLabel>
                  <ResumeInput
                    value={edu.school}
                    name="school"
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Degree</ResumeLabel>
                  <ResumeInput
                    value={edu.degree}
                    name="degree"
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Start Date</ResumeLabel>
                  <ResumeInput
                    type="month"
                    value={edu.startDate}
                    name="startDate"
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>End Date</ResumeLabel>
                  <ResumeInput
                    type="month"
                    value={edu.endDate}
                    name="endDate"
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
                <div>
                  <ResumeLabel>Description</ResumeLabel>
                  <ResumeInput
                    type="text"
                    value={edu.description}
                    name="description"
                    onChange={(e) => handleEducationChange(e, index)}
                  />
                </div>
              </StyledAccordionDetails>
            </Accordion>
            <ButtonRemoveEmployment
              type="button"
              onClick={(e) => handleRemoveEducation(e, index)}
            >
              <FiTrash size={"1.5rem"} />
            </ButtonRemoveEmployment>
          </AccordionContainer>
        );
      })
    );
  };

  const handleSubmit = async (e) => {
    const missing = [];
    for (let key in formData) {
      if (!formData[key]) {
        missing.push(key);
      }
    }

    if (missing.length) {
      toast.error(`Missing data: ${missing.join(", ")}`, {
        position: "top-center",
      });
    }

    if (!missing.length) {
      setIsSubmitting(true);
      try {
        const { data } = await axios.post(
          "/api/resumes/create",
          { resume: { ...formData, education, employment } },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        if (data.status === 200) {
          toast.success(data.message, {
            position: "top-center",
          });
        }
      } catch (err) {
        toast.error(err.response.data.message, {
          position: "top-center",
        });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleAddEmployment = (e) => {
    const newEmployment = {
      jobTitle: "",
      employer: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setEmployment([...employment, newEmployment]);
  };
  const handleAddEducation = (e) => {
    const newEducation = {
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setEducation([...education, newEducation]);
  };

  useEffect(() => {
    async function loadResumeDataIfExists() {
      try {
      } catch (err) {}
    }

    loadResumeDataIfExists().catch(console.error);
  }, []);

  useEffect(() => {
    const form = {
      ...formData,
      education,
      employment,
    };

    if (!onMount.current) {
      const resumeData = localStorage.getItem("resumeData");
      if (resumeData) {
        const parsedForm = JSON.parse(resumeData);
        const e = parsedForm.employment;
        const ed = parsedForm.education;

        delete parsedForm.education;
        delete parsedForm.employment;
        setFormData({ ...parsedForm });
        setEmployment(e);
        setEducation(ed);
      }
    } else {
      localStorage.setItem("resumeData", JSON.stringify(form));
      dispatch(storeResumeData(form));
    }
    return () => {
      onMount.current = true;
    };
  }, [formData, education, employment]);

  return (
    <div
      style={{
        background: "#fff",
        height: "100%",
        overflowY: "scroll",
        width: "100%",
      }}
    >
      <EditorContainer>
        <ResumeTitle style={{ margin: "1rem 0", textAlign: "center" }}>
          Personal Details
        </ResumeTitle>

        <GridContainer>
          <div>
            <ResumeLabel>First Name</ResumeLabel>
            <ResumeInput
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </div>
          <div>
            <ResumeLabel>Last Name</ResumeLabel>
            <ResumeInput
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </div>
          <div>
            <ResumeLabel>Email</ResumeLabel>
            <ResumeInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              maxLength={100}
            />
          </div>
          <div>
            <ResumeLabel>Phone</ResumeLabel>
            <ResumeInput
              maxLength={10}
              onKeyPress={(e) =>
                (e.target.value = e.target.value.slice(0, e.target.maxLength))
              }
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>
          <div>
            <ResumeLabel>Country</ResumeLabel>
            <ResumeInput
              name="country"
              value={formData.country}
              onChange={handleChange}
              placeholder="Enter country"
              maxLength={50}
            />
          </div>
          <div>
            <ResumeLabel>City</ResumeLabel>
            <ResumeInput
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter City"
              maxLength={50}
            />
          </div>
          <div>
            <ResumeLabel>Address</ResumeLabel>
            <ResumeInput
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter Address"
              maxLength={60}
            />
          </div>
          <div>
            <ResumeLabel>Postal Code</ResumeLabel>
            <ResumeInput
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Enter Postal Code"
              maxLength={20}
            />
          </div>
          <div>
            <ResumeLabel>Date of Birth</ResumeLabel>
            <ResumeInput
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              placeholder="Enter Date of Birth"
            />
          </div>
          <div>
            <ResumeLabel>Nationality</ResumeLabel>
            <ResumeInput
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="Enter your nationality"
            />
          </div>
          <div>
            <ResumeLabel>Driving License</ResumeLabel>
            <ResumeInput
              type="text"
              name="license"
              value={formData.license}
              onChange={handleChange}
              placeholder="Enter your license"
            />
          </div>
        </GridContainer>

        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <h1>Professional Summary</h1>
          <p>Write a short sentence or a preview</p>
          <StyledTextArea
            onChange={(e) => handleChange(e)}
            name="summary"
            rows={10}
            maxLength={200}
          ></StyledTextArea>
        </div>

        <h1 style={{ color: "#000", fontSize: "2rem", marginBottom: "1rem" }}>
          Employment History
        </h1>

        <div>{renderEmploymentHistory()}</div>

        <AddEmploymentButton
          type="button"
          onClick={(e) => handleAddEmployment(e)}
        >
          <AiOutlinePlus />
          Add one more employment
        </AddEmploymentButton>

        <h1 style={{ color: "#000", fontSize: "2rem", marginBottom: "1rem" }}>
          Education History
        </h1>
        <div>{renderEducationHistory()}</div>
        <AddEmploymentButton type="button" onClick={handleAddEducation}>
          <AiOutlinePlus />
          Add one more Education
        </AddEmploymentButton>
        <div>
          <h1>Hobbies</h1>
          <p>What do you like?</p>
          <ResumeInput
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <UploadButton
          onClick={handleSubmit}
          type="submit"
          disabled={isSubmitting}
        >
          <AiOutlineCloudUpload style={{ display: "inline" }} size={20} />
          Upload
        </UploadButton>
      </EditorContainer>
    </div>
  );
};

const AddEmploymentButton = styled.button`
  display: flex;
  outline: none;
  background: none;
  padding: 1rem;
  color: #284cf6;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  font-family: "Roboto";
  align-items: center;
  width: 100%;
  border-radius: 5px;
  &:hover {
    background: #284cf641;
  }
`;

const UploadButton = styled.button`
  outline: none;
  border: 1px solid #000;
  background: #284cf6;
  color: #fff;
  padding: 0.5rem 0.8rem;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  width: 100%;
  &:disabled {
    background: #9fa5aa;
    color: #fff;
  }
`;

const GridContainer = styled.div`
  display: grid;
  gap: 2rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ButtonRemoveEmployment = styled.button`
  color: #284cf6;
  border: none;
  outline: none;
  cursor: pointer;
  background: none;
  opacity: 0;
  transition: opacity 0.4s ease;
`;

const AccordionContainer = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: baseline;

  &:hover {
    button {
      opacity: 1;
    }
  }
`;

const StyledAccordionDetails = styled(AccordionDetails)`
  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
`;

const EditorContainer = styled.div`
  margin: 0 2rem;
`;

const StyledDate = styled.p`
  margin-top: 0.5rem;
  color: gray;
`;

export default EditorComponent;
