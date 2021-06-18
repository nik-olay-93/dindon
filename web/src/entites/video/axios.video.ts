import axios from "axios";

const videoRouter = axios.create({
  baseURL: "http://localhost:3000/video",
  withCredentials: true,
});

export default videoRouter;
