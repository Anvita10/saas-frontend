import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function useApiClient() {
  const { logout } = useContext(AuthContext);

  return async function (url, options = {}) {
    const { method = "GET", body, headers = {} } = options;
    const config = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const ApiResponse = await fetch(`http://localhost:5000${url}`, config);

    if (ApiResponse.status === 401) {
      logout();
      window.location.href = "/";
      throw new Error("Unauthorized");
    }

    if (!ApiResponse.ok) {
      throw new Error("Something went wrong");
    }

    if (ApiResponse.status === 204) return null;

    return ApiResponse.json();
  };
}

export default useApiClient;
