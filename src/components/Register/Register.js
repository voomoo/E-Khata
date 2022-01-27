//import react and react related stuff
import { useState } from "react";
import { toast } from "react-toastify";

//import redux stuff
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import redux asynchrounas function
import { registerUser } from "../../_redux/slices/authSlice";

//semantinc ui components import
import { Button, Form, Container, Grid, Image } from "semantic-ui-react";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [cPassword, setCPassword] = useState("");

  const handleSubmit = () => {
    if (registerInfo.password === cPassword) {
      dispatch(registerUser(registerInfo, navigate));
    } else {
      toast.warning("Password and Confirm Password do not match");
    }
  };

  const handleNameChange = (e) => {
    setRegisterInfo({ ...registerInfo, name: e.target.value });
  };

  const handleEmailChange = (e) => {
    setRegisterInfo({ ...registerInfo, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setRegisterInfo({ ...registerInfo, password: e.target.value });
  };
  return (
    <div className="login">
      <Container>
        <Grid verticalAlign="middle" centered>
          <Grid.Column computer={8}>
            <Image className="logo" src="./images/logo.svg" />
            <h3>Welcome to E-Khata</h3>
            <h5>Your online expense management companion</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  placeholder="Name"
                  value={registerInfo.name}
                  type="text"
                  className="my_input"
                  onChange={handleNameChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Email"
                  value={registerInfo.email}
                  type="email"
                  className="my_input"
                  onChange={handleEmailChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Password"
                  type="password"
                  className="my_input"
                  value={registerInfo.password}
                  onChange={handlePasswordChange}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Confirm Password"
                  type="password"
                  className="my_input"
                  value={cPassword}
                  onChange={(e) => setCPassword(e.target.value)}
                />
              </Form.Field>
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
              <Button className="login_btn" fluid type="submit">
                Register
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column computer={8}>
            <Image src="./images/authSidePic.svg" fluid />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Register;
