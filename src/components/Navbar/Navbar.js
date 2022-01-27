import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { logoutUser, userSelector } from "../../_redux/slices/authSlice";

const Navbar = () => {
  const { user } = useSelector(userSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        zIndex: "100",
        background: "white",
        position: "sticky",
        top: "0px",
      }}
    >
      <Link to="/dashboard">
        <img src="./images/logo.svg" alt="logo" />
      </Link>

      <Button.Group color="green">
        <Button>{user.user?.name}</Button>
        <Dropdown className="button icon" floating trigger={<></>}>
          <Dropdown.Menu>
            <Dropdown.Item style={{display:"flex", justifyContent:"space-between"}}>
              Profile{" "}
              <Icon style={{ marginLeft: "10px" }} disabled name="edit" />
            </Dropdown.Item>
            <Dropdown.Item style={{display:"flex", justifyContent:"space-between"}}>
              <Link to="/wallet">Statements </Link>
              <Icon style={{ marginLeft: "10px" }} disabled name="money" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout} style={{display:"flex", justifyContent:"space-between"}}>
              Logout{" "}
              <Icon style={{ marginLeft: "10px" }} disabled name="log out" />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Button.Group>
    </nav>
  );
};

export default Navbar;
