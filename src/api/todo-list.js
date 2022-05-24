import axios from "axios";

export async function getTodoList() {
  return await axios.get(
    'https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list',
    {}
  );
}
