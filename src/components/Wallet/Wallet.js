import {
    Button,
    Container,
    Grid,
    Dimmer,
    Loader,
    Dropdown,
    Icon,
  } from "semantic-ui-react";
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
  import { Fab, Action } from "react-tiny-fab";
  import "react-tiny-fab/dist/styles.css";
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
import Navbar from "../Navbar/Navbar";
  
  const cookies = new Cookies();
  
  const Wallet = () => {
    const { expenses, loading } = useSelector(userSelector);
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
          <Navbar/>
          <Grid centered>
            <Grid.Row>
              <Fab
                mainButtonStyles={{ background: "#fbc02d" }}
                icon={
                  <Icon
                    name="add circle"
                    style={{
                      color: "white",
                      marginLeft: "3px",
                      marginBottom: "2px",
                    }}
                  />
                }
                alwaysShowTitle={true}
              >
                <Action
                  text="Add Income"
                  onClick={() => console.warn("Clicked")}
                  style={{ background: "#388e3c" }}
                  onClick={(e) => newTransactHandler("income")}
                >
                  <Icon name="add circle" style={{ color: "white" }} />
                </Action>
                <Action
                  text="Add Expense"
                  onClick={() => console.warn("Clicked")}
                  style={{ background: "#d32f2f" }}
                  onClick={(e) => newTransactHandler("expense")}
                >
                  <Icon name="add circle" style={{ color: "white" }} />
                </Action>
              </Fab>
              <Grid.Column computer={9} mobile={15}>
              <TransactionModal
                    open={open}
                    setOpen={setOpen}
                    type={type}
                    description=""
                    category=""
                    amount={0}
                    operation="create"
                  />
                <div className="dashboard-body">
                  <h4>Transactions</h4>
                  <Container fluid>
                    {expenses.length > 0
                      ? expenseState
                          .map((expense) => (
                            <ExpenseCard
                              id={expense._id}
                              key={expense._id}
                              title={expense.category}
                              date={expense.createdAt}
                              description={expense.description}
                              category={expense.category}
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
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  };
  
  export default Wallet;
  