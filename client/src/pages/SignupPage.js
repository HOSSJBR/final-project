import React, { useState } from "react";
import MainSplitLayout from "../layouts/MainSplitLayout";

import styled, { css } from "styled-components";
import { Button, FormGroup, Input, Label } from "../components/Form";
import { COLORS } from "../constants/colors";

import axios from "axios";
import RightLayout from "../layouts/RightLayout";

import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { storeUser } from "../actions/userActions";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ButtonCSS = css`
  border-radius: 0.75rem;
  padding: 0.33rem 1.72rem;
  background: ${COLORS.colorMain};
  &:disabled {
    background: #075e94;
    color: #fff;
  }
`;

const SignupPage = () => {
  const emptyForm = {
    fname: "",
    lname: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    category: "",
  };

  const iconOptions = {
    size: "3rem",
  };

  const [imagePreview, setImagePreview] = useState();
  const [formData, setFormData] = useState({ ...emptyForm });
  const [isLoading, setIsLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertBody, setAlertBody] = useState("");

  const [step, setStep] = useState(0);

  const [status, setStatus] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];

      const fr = new FileReader();

      fr.onload = () => {
        if (fr.readyState === FileReader.DONE) {
          setImagePreview(fr.result);
        }
      };

      if (file) {
        fr.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormClear = () => {
    setFormData(emptyForm);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const incompleteForm = Object.keys(formData).some(
      (key) => !formData[key].trim() || !formData[key]
    );

    if (incompleteForm) {
      setAlertBody("Incomplete form!");
      setShowAlert(true);
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await axios.post(
        "/api/users/create",
        { ...formData, image: imagePreview },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setAlertBody(data.message);
      setStatus(data.status);
      dispatch(storeUser({ ...data.user, token: data.user.token }));
      setTimeout(() => {
        navigate("/editor");
      }, 3000);
    } catch (err) {
      setAlertBody(err.response.data.message);
      setStatus(err.response.data.status);
    } finally {
      setShowAlert(true);
    }

    setIsLoading(false);
    handleFormClear();
  };

  if (showAlert) {
    if (status === 200) {
      toast.success(alertBody, {
        position: "top-center",
      });
    } else {
      toast.error(alertBody, {
        position: "top-center",
      });
    }
    setShowAlert(false);
  }

  const stepsToShow = [
    <div style={{ width: "100%" }}>
      <FormGroup>
        <Label>First name</Label>
        <Input
          maxLength={32}
          type="text"
          value={formData.fname}
          name="fname"
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Last name</Label>
        <Input
          maxLength={32}
          type="text"
          value={formData.lname}
          name="lname"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Label>Category</Label>
        <StyledSelect name="category" onChange={handleChange}>
          <option value="UI UX">UiUx</option>
          <option value="Web Developer">Web Developer</option>
        </StyledSelect>
      </FormGroup>
    </div>,

    <>
      <FormGroup>
        <Label>Bio</Label>
        <TextArea
          resizable={false}
          maxLength={80}
          rows={3}
          type="text"
          value={formData.bio}
          name="bio"
          onChange={handleChange}
          placeholder="Tell us about yourself"
        />
      </FormGroup>
      <FormGroup>
        <Label>Email</Label>
        <Input
          maxLength={128}
          type="email"
          value={formData.email}
          name="email"
          onChange={handleChange}
        />
      </FormGroup>
    </>,

    <>
      <FormGroup>
        <Label>Username</Label>
        <Input
          maxLength={16}
          type="text"
          value={formData.username}
          name="username"
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>Password</Label>
        <Input
          maxLength={32}
          type="password"
          value={formData.password}
          name="password"
          onChange={handleChange}
        />
      </FormGroup>
    </>,

    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <StyledPreview
          height={20}
          width={20}
          src={imagePreview}
          alt="Selected Image"
        />
        <StyledFileInput type="file" name="file" onChange={handleChange} />
        <Button type="button" onClick={() => setImagePreview("")}>
          Reset
        </Button>
      </div>
      <Button disabled={isLoading} styles={ButtonCSS}>
        {isLoading ? "Submitting" : "Sign up"}
      </Button>
    </>,
  ];

  const renderStep = () => {
    return stepsToShow[step];
  };

  const renderStepNav = () => {
    return (
      <div style={{ display: "flex" }}>
        <ArrowNav
          disabled={step <= 0}
          type="button"
          onClick={() => setStep(step - 1 <= 0 ? 0 : step - 1)}
        >
          <BiLeftArrowAlt {...iconOptions} />
        </ArrowNav>
        <ArrowNav
          disabled={step >= stepsToShow.length - 1}
          type="button"
          onClick={() =>
            setStep(
              step + 1 >= stepsToShow.length ? stepsToShow.length - 1 : step + 1
            )
          }
        >
          <BiRightArrowAlt {...iconOptions} />
        </ArrowNav>
      </div>
    );
  };

  if (showAlert) {
    const toastType = status === 200 ? toast.success : toast.error;
    toastType(alertBody, {
      toastId: "apiError",
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000,
      closeOnClick: true,
    });
    setShowAlert(false);
  }

  return (
    <MainSplitLayout>
      <RightLayout styles={Centered}>
        <FormContainer onSubmit={handleSubmitForm}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              gap: "3rem",
            }}
          >
            <div>
              <Button
                onClick={() => navigate("/signup")}
                style={{
                  borderTopLeftRadius: "3px",
                  borderBottomLeftRadius: "3px",
                }}
              >
                Signup
              </Button>
              <Button
                onClick={() => navigate("/login")}
                style={{
                  borderTopRightRadius: "3px",
                  borderBottomRightRadius: "3px",
                }}
              >
                Login
              </Button>
            </div>
            {renderStep()}
            {renderStepNav()}
          </div>
        </FormContainer>
      </RightLayout>
    </MainSplitLayout>
  );
};

const ArrowNav = styled.button`
  background: none;
  color: ${COLORS.colorMain};
  outline: 0;
  border: 0;
  cursor: pointer;
  &:disabled {
    color: #d3d3d3;
  }
`;

const Centered = css`
  display: flex;
  align-items: center;
`;
const StyledFileInput = styled.input`
  &::-webkit-file-upload-button {
    background: #ed1c1b;
    border: 2px solid #ed1c1b;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    outline: none;
    padding: 10px 25px;
    text-transform: uppercase;
    transition: color 0.3s ease, background 0.3s ease;

    &:hover {
      background: #fff;
      border: 2px solid #535353;
      color: #000;
    }
  }
`;
const StyledPreview = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const StyledSelect = styled.select`
  cursor: pointer;
  display: inline-block;
  position: relative;
  border: 0;
  font-size: 1rem;
  outline: 0;
`;

const TextArea = styled.textarea`
  background: none;
  color: #fff;
  border: 0;
  outline: 0;
  border-bottom: 1px solid ${COLORS.colorMain};
  resize: none;
  font-size: 1rem;
`;

const FormContainer = styled.form`
  padding: 0 2rem;
  width: 100%;
`;

export default SignupPage;
