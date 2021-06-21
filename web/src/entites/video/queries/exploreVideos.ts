import videoRouter from "../axios.video";
import Video from "../entity.video";

export default async function exploreQuery(): Promise<Video[]> {
  const response = await videoRouter.get("/explore");
  return response.data;
}
