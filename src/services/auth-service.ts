import axiosInstance from "@/config/axios";
interface Payload {
  email: string;
  password: string;
}

class AuthService {
  async login(payload: Payload) {
    const route = await axiosInstance.post("api/v1/auth/login", payload);
    const { accessToken } = route.data;
    localStorage.setItem("accessToken", accessToken);
    return route;
  }
}

export default new AuthService();
