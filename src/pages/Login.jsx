import styled from "styled-components";
import { Link } from "react-router-dom";
import { login, userDetail } from "../services/userapi";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";

function Login() {
  const LoginWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
  `;

  const LoginForm = styled.div`
    width: 340px;
    height: 370px;
    margin-top: 80px;
    border-radius: 5px;
    background-color: #f4f6ff;
  `;

  const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  `;

  const Input = styled.input``;

  const Field = styled.div``;

  const Label = styled.label``;

  const Button = styled.button``;

  const Text = styled.p``;

  const TextLink = styled.span``;

  const Error = styled.p`
    color: #e84a5f;
    font-size: 12px;
    margin-top: 3px;
    display: ${(prop) => (prop.active ? "block" : "none")};
  `;

  const [error, setError] = useState(false);

  const history = useHistory();

  const { setCurrentUser } = useUser();

  const formSubmit = async (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let password = e.target[1].value;
    // console.log(username, password);
    try {
      let result = await login(username, password);
      // console.log(result);
      localStorage.setItem("Token", result.token);
      let userInfo = await userDetail(result.token);
      // console.log(userInfo);
      setCurrentUser(userInfo[0]);
      history.push("/post");
    } catch (err) {
      setError(true);
      console.log("Login Fail");
    }
  };
  return (
    <LoginWrapper>
      <LoginForm>
        <Form className="ui form" onSubmit={formSubmit}>
          <h3 className="ui dividing header">Login</h3>
          <Field className="field">
            <Label>Username</Label>
            <Input
              onChange={() => setError(false)}
              type="text"
              name="username"
              placeholder="Username"
            />
          </Field>
          <Field className="field">
            <Label>Password</Label>
            <Input type="password" name="password" placeholder="Password" />
          </Field>
          <Error active={error}>Username or Password is Incorrect.</Error>
          <Button type="submit" className="ui secondary button">
            Login
          </Button>
          <Text>
            Don't have an account? Register
            <Link to="/register">
              <TextLink> Here</TextLink>
            </Link>
          </Text>
        </Form>
      </LoginForm>
    </LoginWrapper>
  );
}

export default Login;
