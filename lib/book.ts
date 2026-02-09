import api from "./axios";

export async function getBookById(id: string) {
  const response = await api.get("/getBook", {
    params: { id }, // this matches the Book object contract you showed
  });

  return response.data;
}
