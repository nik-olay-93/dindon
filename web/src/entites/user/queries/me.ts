import userRouter from "../axios.user";

export default async function meQuery(): Promise<
  { id: string; username: string } | undefined
> {
  try {
    const response = await userRouter.get("/me");
    return {
      id: response.data.id,
      username: response.data.username,
    };
  } catch (err) {
    return undefined;
  }
}
