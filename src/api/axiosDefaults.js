import axios from "axios";

axios.defaults.baseURL = "https://emil-pp5-api-7b47e7ded060.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

/** Create a new instance of axios for response interceptor,
 * used for refreshing the token when it expires
 */
export const axiosReq = axios.create();
export const axiosRes = axios.create();