import { Button, Container, Grid, Dimmer, Loader } from "semantic-ui-react";
import { FiEdit, FiSettings } from "react-icons/fi";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  getUserAuthSuccess,
  userSelector,
} from "../../_redux/slices/authSlice";
import { logoutUser } from "../../_redux/slices/authSlice";
import ExpenseCard from "../ExpenseCard/ExpenseCard";
import TransactionModal from "../TransectionModal/TransactionModal";
import { useEffect, useState } from "react";
import { getAllExpenses } from "../../api/apiRequest";
import { GiToolbox, GiWallet } from "react-icons/gi";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import {
  FaBusAlt,
  FaBuilding,
  FaBookReader,
  FaGifts,
  FaHandHoldingUsd,
} from "react-icons/fa";
import { RiParentFill } from "react-icons/ri";
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

const Dashboard = () => {
  const { user, expenses, loading } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [expenseState, setExpenseState] = useState([]);

  useEffect(() => {
    setExpenseState([...expenses]);
  }, [expenses]);

  useEffect(() => {
    const userCookie = cookies.get("user");
    if (userCookie !== undefined) {
      dispatch(getUserAuthSuccess(userCookie));
    }
  }, []);

  useEffect(() => {
    if (!open) {
      dispatch(fetchExpenses());
    }
  }, [open]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser(navigate));
  };

  const newTransactHandler = (expenseType) => {
    setType(expenseType);
    setOpen(!open);
    console.log(expenseType);
  };

  const iconSetter = (title, type) => {
    switch (title) {
      case "food":
        return (
          <IoFastFood
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "transport":
        return (
          <FaBusAlt
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "rent":
        return (
          <FaBuilding
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "equipment":
        return (
          <GiToolbox
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "entertainment":
        return (
          <IoLogoGameControllerB
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "education":
        return (
          <FaBookReader
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "salary":
        return (
          <GiWallet
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "freelance":
        return (
          <FaHandHoldingUsd
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "gift":
        return (
          <FaGifts
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      case "parents":
        return (
          <RiParentFill
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
      default:
        return (
          <FiSettings
            color={type === "expense" ? "#D01919" : "#21BA45"}
            size={42}
          />
        );
    }
  };

  return (
    <div className="dashboard">
      <Container fluid>
        <Dimmer active={loading}>
          <Loader size="massive">Loading</Loader>
        </Dimmer>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={3}>
              <div className="logo-container">
                <img src="./images/logo.svg" alt="logo" />
              </div>
            </Grid.Column>
            <Grid.Column computer={9}>
              <div className="dashboard-body">
                <h4>Transactions</h4>
                <Container fluid>
                  {expenses.length > 0
                    ? expenseState
                        .reverse()
                        .map((expense) => (
                          <ExpenseCard
                            id={expense._id}
                            key={expense._id}
                            title={expense.category}
                            date={expense.createdAt}
                            description={expense.description}
                            amount={expense.amount}
                            color={
                              expense.accountType === "expense"
                                ? "red"
                                : "green"
                            }
                            icon={iconSetter(
                              expense.category,
                              expense.accountType
                            )}
                          />
                        ))
                    : console.log("Still loading")}
                </Container>
              </div>
            </Grid.Column>
            <Grid.Column computer={4}>
              <div className="sideInfo">
                <div className="user-card">
                  <img src="./images/user.png" alt="" />
                  <h4>{user.user?.name}</h4>
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
                <Button
                  color="red"
                  className="add-btn"
                  onClick={(e) => newTransactHandler("expense")}
                >
                  <FaRegPlusSquare size={24} />
                  Add New Expense
                </Button>
                <Button
                  color="green"
                  className="add-btn"
                  onClick={(e) => newTransactHandler("income")}
                >
                  <FaRegPlusSquare size={24} />
                  Add New Income
                </Button>
                <TransactionModal
                  open={open}
                  setOpen={setOpen}
                  type={type}
                  description=""
                  category=""
                  amount={0}
                />
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
