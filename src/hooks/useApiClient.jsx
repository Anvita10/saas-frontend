import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useApiClient() {
  const { logout, token } = useContext(AuthContext);

  return async function (url, options = {}) {
    const { method = "GET", body, headers = {} } = options;
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      const ApiResponse = await fetch(`http://localhost:5000${url}`, config);

      if (ApiResponse.status === 401) {
        logout();
        window.location.href = "/";
        throw new Error("Unauthorized");
      }

      if (!ApiResponse.ok) {
        const errData = await ApiResponse.json();
        throw new Error(errData.message || "Something went wrong");
      }

      if (ApiResponse.status === 204) return null;

      return ApiResponse.json();
    } catch (err) {
      console.error("API Error:", err.message);
      throw err;
    }
  };
}

export default useApiClient;
