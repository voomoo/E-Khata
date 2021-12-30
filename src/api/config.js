import axios from "axios";

const Axios = axios.create({
  baseURL: "https://e-khata.herokuapp.com/api/v1/",
  timeout: 5000,
  validateStatus: (status) => {
    return status < 500;
  },
});

export default Axios;
