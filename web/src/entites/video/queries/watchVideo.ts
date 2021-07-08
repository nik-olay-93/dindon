import videoRouter from "../axios.video";
import Video from "../entity.video";

export default async function watchQuery(
  id: string
): Promise<Video | undefined> {
  const response = await videoRouter.get(`/watch/${id}`);
  return response.data;
}
