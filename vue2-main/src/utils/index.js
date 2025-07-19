import { handleLogout } from "@/service";

export const logout = () => {
  handleLogout().then(() => {
    window.location.href = "/login";
  });
};
