import userRouter from "../axios.user";

export default async function registerQuery(
  username: string,
  password: string
) {
  try {
    const response = await userRouter.post("/register", {
      username,
      password,
    });
    return {
      field: response.data.field,
      message: response.data.message,
    };
  } catch (err) {
    return { field: "", message: "" };
  }
}
