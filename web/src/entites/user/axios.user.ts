import axios from "axios";

const userRouter = axios.create({
  baseURL: "http://localhost:3000/users",
  withCredentials: true,
});

export default userRouter;
