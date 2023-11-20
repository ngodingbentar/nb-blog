import type { IUser } from "@/types/user";
import axios from "axios";

async function doLogin (payload: IUser) {
  const res = await axios.post('api/login', payload);
  return res.data
}

export { doLogin }