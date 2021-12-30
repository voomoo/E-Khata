import { Button, Container, Grid } from "semantic-ui-react";
import { FiEdit, FiSettings } from "react-icons/fi";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_redux/slices/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  return (
    <div className="dashboard">
      <Container fluid>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={4}>
              <div>
                <img src="./images/logo.svg" alt="logo" />
              </div>
            </Grid.Column>
            <Grid.Column computer={8}>
              <div>app body</div>
            </Grid.Column>
            <Grid.Column computer={4}>
              <div className="user-card">
                <img src="./images/user.png" alt="" />
                <h4>Welcome Jane!</h4>
                <Grid columns={2}>
                  <Grid.Column>
                    <h5>Profile</h5>
                    <h5>Settings</h5>
                    <h5>Wallet</h5>
                  </Grid.Column>
                  <Grid.Column>
                    <h5>
                      <FiEdit />
                    </h5>
                    <h5>
                      <FiSettings />
                    </h5>
                    <h5>
                      <FaWallet />
                    </h5>
                  </Grid.Column>
                </Grid>
                <Button size="mini" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
