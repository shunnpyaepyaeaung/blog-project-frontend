import { useContext } from "react";
import { UserContext } from "../App";

const useUser = () => {
  return useContext(UserContext);
};

export default useUser;
