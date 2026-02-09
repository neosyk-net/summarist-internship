import api from "./axios";

export async function searchBooks(search: string) {
  const response = await api.get("/getBooksByAuthorOrTitle", {
    params: { search },
  });
  return response.data;
}
