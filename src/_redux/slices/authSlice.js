//redux toolkit imports
import { createSlice } from "@reduxjs/toolkit";

//axios instance import
import Axios from "../../api/config";

//toastify import
import { toast } from "react-toastify";

//import universal-cookie
import Cookies from "universal-cookie/es6";

const cookies = new Cookies();

export const initialState = {
  loading: false,
  hasError: false,
  user: {},
  expenses: [],
};

// A slice for recipes with our 3 reducers
const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    getUserAuth: (state) => {
      state.loading = true;
    },
    getUserAuthSuccess: (state, { payload }) => {
      state.user = payload;
      state.loading = false;
      state.hasError = false;
    },
    getExpensesSuccess: (state, { payload }) => {
      state.expenses = payload?.data;
      state.loading = false;
      state.hasError = false;
    },
    postExpenseSuccess: (state) => {
      state.loading = false;
      state.hasError = false;
    },
    getUserAuthFailure: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

//three actions generated from this slice
export const {
  getUserAuth,
  getUserAuthSuccess,
  getUserAuthFailure,
  getExpensesSuccess,
  postExpenseSuccess,
} = userAuthSlice.actions;

//A selector
export const userSelector = (state) => state.userAuth;

// The reducer
export default userAuthSlice.reducer;

//Asynchronous thunk action
export const loginUser = (payload, navigate) => {
  return async (dispatch) => {
    //start fetching by setting the loading state to true
    dispatch(getUserAuth());

    try {
      const response = await Axios.post("auth/login", payload);
      if (response.data.success) {
        //set the response data in cookies as user
        cookies.set("user", response.data);

        //notify the user login was success
        toast.success("Login Success");

        //if login success then save the response data in user state
        dispatch(getUserAuthSuccess(response.data));

        navigate("/dashboard");
      } else {
        dispatch(getUserAuthFailure());
        //notify the user login failed with proper message
        toast.warning(response.data.message);
      }
    } catch (error) {
      //if error found set hasError state
      dispatch(getUserAuthFailure());
      console.log(error);
    }
  };
};

export const registerUser = (payload, navigate) => {
  return async (dispatch) => {
    //start fetching by setting the loading state to true
    dispatch(getUserAuth());

    try {
      const response = await Axios.post("auth/register", payload);
      if (response.data.success) {
        //set the response data in cookies as user
        cookies.set("user", response.data);

        //notify the user login was success
        toast.success("Login Success");

        //if login success then save the response data in user state
        dispatch(getUserAuthSuccess(response.data));

        navigate("/dashboard");
      } else {
        dispatch(getUserAuthFailure());
        //notify the user login failed with proper message
        toast.warning(response.data.message);
      }
    } catch (error) {
      //if error found set hasError state
      dispatch(getUserAuthFailure());
      console.log(error);
    }
  };
};

export const logoutUser = (navigate) => {
  return async (dispatch) => {
    dispatch(getUserAuth());
    cookies.remove("user");
    dispatch(getUserAuthSuccess({}));
    navigate("/login");
    toast.success("Logout Success");
  };
};

export const fetchExpenses = () => {
  return async (dispatch, getState) => {
    //start fetching by setting the loading state to true
    dispatch(getUserAuth());

    try {
      const response = await Axios.get("/expense-tracker", {
        headers: { "x-access-token": getState().userAuth.user.user.token },
      });
      console.log(getState().userAuth.user.user.token);
      if (response.data.success) {
        //if login success then save the response data in user state
        dispatch(getExpensesSuccess(response.data));
      } else {
        dispatch(getUserAuthFailure());
      }
    } catch (error) {
      //if error found set hasError state
      dispatch(getUserAuthFailure());
      console.log(error);
    }
  };
};

export const postExpense = (payload) => {
  return async (dispatch, getState) => {
    //start fetching by setting the loading state to true
    dispatch(getUserAuth());

    try {
      const res = await Axios.post("/expense-tracker", payload, {
        headers: { "x-access-token": getState().userAuth.user.user.token },
      });
      if (res.data.success) {
        //if login success then save the response data in user state
        dispatch(fetchExpenses());
        dispatch(postExpenseSuccess());
      } else {
        dispatch(getUserAuthFailure());
      }
    } catch (error) {
      //if error found set hasError state
      dispatch(getUserAuthFailure());
      console.log(error);
    }
  };
};

export const deleteExpense = (id) => {
  return async (dispatch, getState) => {
    //start fetching by setting the loading state to true
    dispatch(getUserAuth());

    try {
      const res = await Axios.delete(`/expense-tracker/${id}`, {
        headers: { "x-access-token": getState().userAuth.user.user.token },
      });
      if (res.data.success) {
        //if login success then save the response data in user state
        dispatch(postExpenseSuccess());
      } else {
        dispatch(getUserAuthFailure());
      }
    } catch (error) {
      //if error found set hasError state
      dispatch(getUserAuthFailure());
      console.log(error);
    }
  };
};
