import videoRouter from "../axios.video";
import Video from "../entity.video";

export default async function exploreQuery(
  count = 20,
  lastDate = Date.now()
): Promise<Video[]> {
  const response = await videoRouter.get(`/explore?c=${count}&a=${lastDate}`);
  return response.data;
}
