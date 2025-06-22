import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import spinner from "../../../assets/spinner.gif";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAppDispatch } from "../../../redux/reactReduxTypedHooks";
import {
  AuthUser,
  type UniqueResponseFormat,
} from "../../../api/auth/authAPIs";
import { logout, setAuthUser } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";

const PersistAuth: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Authentication required");
        }

        const response = await AuthUser({ axiosPrivate });
        if (response && response?.data?.role === "Admin") {
          const authData: UniqueResponseFormat = {
            data: {
              id: response.data?.id,
              name: response.data?.name,
              email: response.data?.email,
              role: response.data?.role,
            },
          };
          dispatch(setAuthUser(authData));
        } else {
          dispatch(logout());
          navigate("/");
          toast.error("Unauthorized");
        }
      } catch (error: any) {
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [dispatch, navigate, axiosPrivate, location]);
  if (isLoading) {
    return (
      <div className="w-screen h-screen min-h-screen max-h-screen overflow-hidden flex items-center justify-center">
        <img src={spinner} alt="loading_spinner" className="w-24" />
      </div>
    );
  }

  return <Outlet />;
};

export default PersistAuth;
