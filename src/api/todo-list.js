import axios from "axios";
import {config} from '../config';

export async function getTodoList() {
  return await axios.get(`${config.api_host}/to-do-list`,
    {}
  );
}
