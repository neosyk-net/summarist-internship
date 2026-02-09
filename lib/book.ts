import api from "./axios";

export async function getBooks() {
  const response = await api.get("/getBooks");
  return response.data;
}

export async function getBookById(id: string) {
  const response = await api.get("/getBook", {
    params: { id },
  });

  return response.data;
}
