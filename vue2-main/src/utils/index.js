import Cookies from "js-cookie";
import { CRMSESSID } from "@/config";
import microApp from "@micro-zoe/micro-app";

export const logout = () => {
  microApp.setGlobalData({ token: "" });
  Cookies.remove(CRMSESSID);
  window.location.href = "/login";
};
