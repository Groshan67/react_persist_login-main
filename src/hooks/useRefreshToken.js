import axios from "../api/axios";
import useAuth from "./useAuth";

const REFRESH_URL = "/auth/refresh-token";
const useRefreshToken = () => {
  const { auth, setAuth } = useAuth();

  const refresh = async () => {
    // const response = await axios.post('/auth/refresh-token', {
    //     withCredentials: true ,
    //     refreshToken: auth.refreshToken
    // });

    const response = await axios.post(
      REFRESH_URL,
      JSON.stringify({
        refreshToken: auth.refreshToken,
        withCredentials: true,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      console.log(response.data.refreshToken);
      return {
        ...prev,
       // roles: response.data.roles,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
    });

    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
