//import react and react related stuff
import { useState } from "react";

//import redux asynchronous function
import { loginUser, userSelector } from "../../_redux/slices/authSlice";

//import redux dispatch
import { useDispatch, useSelector } from "react-redux";

//semantinc ui components import
import {
  Button,
  Form,
  Container,
  Grid,
  Image,
  Dimmer,
  Loader,
} from "semantic-ui-react";

import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector);
  const navigate = useNavigate();

  const handleSubmit = () => {
    dispatch(loginUser(loginInfo, navigate));
  };

  const handleEmailChange = (e) => {
    setLoginInfo({ ...loginInfo, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setLoginInfo({ ...loginInfo, password: e.target.value });
  };
  return (
    <div className="login">
      <Dimmer active={loading}>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Container>
        <Grid verticalAlign="middle" centered>
          <Grid.Column computer={8} mobile={16}>
            <Image className="logo" src="./images/logo.svg" />
            <h3>Welcome to E-Khata</h3>
            <h5>Your online expense management companion</h5>
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <input
                  placeholder="Email"
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
                  onChange={handlePasswordChange}
                />
              </Form.Field>
              <p>
                Don't have an account? <Link to="/register">Register Now</Link>
              </p>
              <Button className="login_btn" fluid type="submit">
                Log In
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column computer={8} mobile={16}>
            <Image src="./images/authSidePic.svg" fluid />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
