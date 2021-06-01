import userRouter from "../axios.user";

export default async function loginQuery(username: string, password: string) {
  try {
    const response = await userRouter.post("/login", {
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
