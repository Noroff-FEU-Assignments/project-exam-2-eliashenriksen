import { BASE_URL } from "../constants/api";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import axios from "axios";

export default function useAxios() {
 const [auth] = useContext(AuthContext);

 const apiClient = axios.create({
  baseURL: BASE_URL,
 });

 if(auth) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${auth}`;
 }

//  apiClient.interceptors.request.use(function (config) {
//   const token = auth;
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   return config;
//  });

 return apiClient;
}