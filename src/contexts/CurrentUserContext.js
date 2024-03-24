import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// Create a context to store the current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Create a custom hook to read the current user from the context
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Create a provider to manage the current user state and make it available throughout the app
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch the current user when the component mounts
  useEffect(() => {
    handleMount();
  }, []);

  // Add interceptors to refresh the authorization token when it expires
  useMemo(() => {
    // Add a request interceptor
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          // Refresh the token
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          // If the refresh token fails, redirect to the sign-in page
          setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // Add a response interceptor
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            // Refresh the token
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              // If the refresh token fails, redirect to the sign-in page
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
