import userRouter from "../axios.user";

export default async function logoutQuery(): Promise<void> {
  await userRouter.post("/logout");
}
