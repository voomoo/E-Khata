import Axios from "./config";
import Cookies from "universal-cookie/es6";
import { toast } from "react-toastify";

const cookies = new Cookies();
const userCookie = cookies.get("user");

export const postExpense = async (payload) => {
  try {
    const res = await Axios.post("/expense-tracker", payload, {
      headers: { "x-access-token": userCookie.user.token },
    });
    console.log(res);
    if (res.data.success) {
      toast.success("Expense Saved Successfully!");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllExpenses = async (setter) => {
  try {
    const res = await Axios.get("/expense-tracker", {
      headers: {
        "x-access-token": userCookie.user.token,
      },
    });
    if (res.data === "Invalid Token") {
      cookies.remove("user");
    } else {
      setter(res.data.data);
    }
  } catch (error) {
    console.log(error);
  }
};
