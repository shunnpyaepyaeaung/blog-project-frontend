import styled from "styled-components";
import { Link } from "react-router-dom";
import { registerUser } from "../services/userapi";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function Register() {
  const RegisterWrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
  `;

  const RegisterForm = styled.div`
    width: 340px;
    height: 500px;
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

  const formSubmit = async (e) => {
    e.preventDefault();
    let username = e.target[0].value;
    let email = e.target[1].value;
    let password = e.target[2].value;
    let confirmPassword = e.target[3].value;
    if (password !== confirmPassword) {
      setError(true);
      return;
    }
    let result = await registerUser(username, email, password);
    history.push("/login");
  };

  return (
    <RegisterWrapper>
      <RegisterForm>
        <Form className="ui form" onSubmit={formSubmit}>
          <h3 className="ui dividing header">Register</h3>
          <Field className="field">
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </Field>
          <Field className="field">
            <Label>Email</Label>
            <Input type="email" name="email" placeholder="Email" required />
          </Field>
          <Field className="field">
            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </Field>
          <Field className="field">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confpassword"
              placeholder="Confirm Password"
              required
            />
          </Field>
          <Error active={error}>
            Password and Confirm Password must be same.
          </Error>
          <Button type="submit" className="ui secondary button">
            Register
          </Button>
          <Text>
            Already have an account? Login
            <Link to="/login">
              {" "}
              <TextLink>Here</TextLink>
            </Link>
          </Text>
        </Form>
      </RegisterForm>
    </RegisterWrapper>
  );
}

export default Register;
