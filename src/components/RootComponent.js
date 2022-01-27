
import { useRoutes } from "react-router-dom";

import Cookies from "universal-cookie/es6";


import routes from "../routes";

const RootComponent = () => {
  const cookies = new Cookies();
  const userCookie = cookies.get("user");
  // const { loading, hasError, user } = useSelector(userSelector);
  const routing = useRoutes(routes(userCookie !== undefined));
  // const dispatch = useDispatch();

  return (
    <div>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes> */}
      {routing}
    </div>
  );
};

export default RootComponent;
