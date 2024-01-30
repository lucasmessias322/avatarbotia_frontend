import axios from "axios";

export const BaseUrl = "http://localhost:3000";
const api = axios.create({
  baseURL: BaseUrl,
});

export async function postAskIA(Question) {
  return api
    .post("/api/askIa", { "Question": Question })
    .then((response) => response)
    .catch((error) => console.log(error));
}
