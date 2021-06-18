import videoRouter from "../axios.video";

export default async function createVideo(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const response = await videoRouter.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}
