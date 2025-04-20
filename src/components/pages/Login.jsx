import React, { useContext, useReducer, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthWrapper";
import { Marginer } from "../marginer";
import { motion } from "framer-motion";

const BoxContainer = styled.div`
  width: 280px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
  position: relative;
  overflow: hidden;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  z-index: 5; 
`;

const TopContainer = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0 1.8em;
  padding-bottom: 5em;
`;

const BackDrop = styled(motion.div)`
  position: absolute;
  width: 160%;
  height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 50%;
  top: -290px;
  left: -70px;
  transform: rotate(60deg);
  background: linear-gradient(to top left, #10b981, #84cc16);
  z-index: 10;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.div`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: #fff;
  z-index: 10;
`;

const SmallText = styled.div`
  font-size: 11px;
  font-weight: 500;
  color: #fff;
  margin-top: 7px;
  z-index: 10;
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
`;

const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 5px;
  padding: 0px 10px;
  transition: all 200ms ease-in-out;
  margin-bottom: 5px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:focus {
    outline: none;
    border-bottom: 1px solid #16a34a;
  }
`;

export const SubmitButton = styled.button`
  margin: 0 auto;
  width: 100%;
  max-width: 150px;
  padding: 10px;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 240ms ease-in-out;
  background: linear-gradient(to top left, #10b981, #84cc16);
  box-shadow: 0 0 5px rgba(241, 196, 15, 0.3);

  &:hover {
    filter: brightness(1.03);
    background: linear-gradient(to top left, #10b981, #84cc16);
    box-shadow: 0 0 10px rgba(241, 196, 15, 0.5);
  }
`;

const LineText = styled.p`
  margin: 0 auto;
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
`;

const BoldLink = styled.a`
  font-size: 12px;
  color: #15803d;
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(241, 196, 15, 1);
`;

const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 1px dashed rgba(200, 200, 200, 0.8);
`;

export function Login(props) {

  const { login, signup, switchToSignup, switchToLogin, isSignup } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const [formData, setFormData] = useReducer(
    (formData, newItem) => ({ ...formData, ...newItem }),
    { userName: "", email: "", password: "", repeatPassword: "" }
  );

  const [errorMessage, setErrorMessage] = useState(null);
  const [isExpanded, setExpanded] = useState(false);

  const doLogin = async () => {
    try {
      await login(formData.userName, formData.password);
      navigate("/store");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const doSignup = async () => {
    try {
      await signup(formData.userName, formData.password);
      navigate("/store");
    } catch (error) {
      setErrorMessage(error);
    }
  };

  const playExpandingAnimation = () => {
    setExpanded(true);
    setTimeout(() => {
      setExpanded(false);
    }, 700);
  };

  const handleSwitchToSignup = () => {
    playExpandingAnimation();
    setTimeout(() => {
      switchToSignup();
    }, 400);
  };

  const handleSwitchToLogin = () => {
    playExpandingAnimation();
    setTimeout(() => {
      switchToLogin();
    }, 400);
  };

  return (
    <BoxContainer className="font-Poppins m-auto mt-10">
      <TopContainer>
        <BackDrop
          initial={false}
          animate={isExpanded ? "expanded" : "collapsed"}
          variants={{
            expanded: {
              width: "233%",
              height: "1050px",
              borderRadius: "20%",
              transform: "rotate(60deg)",
            },
            collapsed: {
              width: "160%",
              height: "550px",
              borderRadius: "50%",
              transform: "rotate(60deg)",
            },
          }}
          transition={{ type: "spring", duration: 2.3, stiffness: 30 }}
        />
        <HeaderContainer className="cursor-pointer">
          <HeaderText>
            {isSignup ? "Create Account" : "Welcome Back"}
          </HeaderText>
          <SmallText>
            {isSignup ? "Sign up to continue!" : "Please sign-in to continue!"}
          </SmallText>
        </HeaderContainer>
      </TopContainer>
      <InnerContainer>
        
        <FormContainer>
          {isSignup && (
            <Input
              type="text"
              placeholder="Username"
              value={formData.userName}
              onChange={(e) => setFormData({ userName: e.target.value })}
            />
          )}

          <Input
            type="text"
            placeholder="Email"
            value={formData.userName || ""}
            onChange={(e) => setFormData({ userName: e.target.value })}
          />
          

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ password: e.target.value })}
          />

          {isSignup && (
            <Input
              type="password"
              placeholder="Repeat Password"
              value={formData.repeatPassword || ""}
              onChange={(e) => setFormData({ repeatPassword: e.target.value })}
            />
          )}

        {errorMessage && <div className="error text-xs text-red-500 italic">{errorMessage}</div>}

        </FormContainer>
        <Marginer direction="vertical" margin={10} />
        <MutedLink href="#">Forget your password?</MutedLink>
        <Marginer direction="vertical" margin="1.6em" />
        <SubmitButton type="submit" onClick={isSignup ? doSignup : doLogin}>
          {isSignup ? "Sign Up" : "Sign In"}
        </SubmitButton>
        <Marginer className="m-2" />
        <LineText className="cursor-pointer">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <BoldLink onClick={handleSwitchToLogin} >Sign In</BoldLink>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <BoldLink onClick={handleSwitchToSignup}>Sign Up</BoldLink>
            </>
          )}
        </LineText>
      </InnerContainer>
    </BoxContainer>
  );
}

export default Login;
