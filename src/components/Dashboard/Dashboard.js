import Navbar from "../Navbar/Navbar";
import Cookies from "universal-cookie/es6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpensesRange,
  getUserAuthSuccess,
  userSelector,
} from "../../_redux/slices/authSlice";
import ReactApexChart from "react-apexcharts";
import { Container, Grid, Icon, Label, Segment } from "semantic-ui-react";
import { IoWalletSharp } from "react-icons/io5";
import { BsCashCoin } from "react-icons/bs";
import { GiCoinflip } from "react-icons/gi";
import { Dropdown } from "semantic-ui-react";
import { Action, Fab } from "react-tiny-fab";
import TransactionModal from "../TransectionModal/TransactionModal";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const cookies = new Cookies();
const rangeOption = [
  {
    key: "365",
    text: "1 year",
    value: 366,
  },
  {
    key: "185",
    text: "6 months",
    value: 185,
  },
  {
    key: "30",
    text: "1 month",
    value: 31,
  },
  {
    key: "15",
    text: "15 days",
    value: 16,
  },
  {
    key: "7",
    text: "7 days",
    value: 8,
  },
  {
    key: "3",
    text: "3 days",
    value: 4,
  },
  {
    key: "1",
    text: "1 day",
    value: 2,
  },
];

const Dashboard = () => {
  useEffect(() => {
    const userCookie = cookies.get("user");
    if (userCookie !== undefined) {
      dispatch(getUserAuthSuccess(userCookie));
    }
    dispatch(fetchExpensesRange(30));
  }, []);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const { user, expensesRange, loading } = useSelector(userSelector);
  console.log("expense" in expensesRange);

  const newTransactHandler = (expenseType) => {
    setType(expenseType);
    setOpen(!open);
    console.log(expenseType);
  };

  
  return (
    <div>
      <Navbar />
      <Container>
        <Grid columns={3}>
          <Grid.Column>
            <Segment
              padded
              color="teal"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Label color="teal" attached="top">
                Current Balance
              </Label>
              <h4 style={{ color: "#00B5AD" }}>
                {" "}
                ৳ {user?.user?.currentBalance}
              </h4>
              <IoWalletSharp
                size={36}
                style={{ marginTop: "15px", color: "#00B5AD" }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              padded
              color="green"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Label color="green" attached="top">
                Total Income
              </Label>
              <h4 style={{ color: "#21BA45" }}> ৳ {user?.user?.totalIncome}</h4>
              <BsCashCoin
                size={36}
                style={{ marginTop: "15px", color: "#21BA45" }}
              />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment
              padded
              color="red"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Label color="red" attached="top">
                Total Expense
              </Label>
              <h4 style={{ color: "#DB2828" }}>
                {" "}
                ৳ {user?.user?.totalExpense}
              </h4>
              <GiCoinflip
                size={36}
                style={{ marginTop: "15px", color: "#DB2828" }}
              />
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      <Container style={{ marginTop: "20px" }}>
        <Segment padded color="blue" style={{ height: "400px" }}>
          <Label
            color="blue"
            attached="top"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Overview</span>
            <span>
              Showing Last{" "}
              <Dropdown
                inline
                options={rangeOption}
                defaultValue={rangeOption[2].value}
                onChange={(e, data) => {dispatch(fetchExpensesRange(data.value))}}
              />
            </span>
          </Label>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={expensesRange?.catData}
              margin={{
                top: 5,
                right: 30,
                left: 10,
                bottom: 15,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"/>
              <YAxis label={{ value: 'Taka (৳)', angle: -90, position: 'left' }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#27AE60" />
              <Bar dataKey="expense" fill="#EB5757" />
            </BarChart>
          </ResponsiveContainer>
        </Segment>
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
        <TransactionModal
          open={open}
          setOpen={setOpen}
          type={type}
          description=""
          category=""
          amount={0}
          operation="create"
        />
      </Container>
    </div>
  );
};

export default Dashboard;
