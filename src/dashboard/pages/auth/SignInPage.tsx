import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import eventImage from "../../../assets/eventImage.png";
import type { SignInSchemaType } from "../../../schema/auth/signInSchema";
import SignInSchema from "../../../schema/auth/signInSchema";
import TBHMSPasswordField from "../../components/TBHMSPasswordField";
import HIMSEmailField from "../../components/HimsEmailField";
import { ImSpinner3 } from "react-icons/im";
import toast from "react-hot-toast";
import { SignIn } from "../../../api/auth/authAPIs";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const SignInPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
      role: "Admin",
    },
  });

  const onSubmit = async (data: SignInSchemaType) => {
    setIsLoading(true);
    try {
      const response = await SignIn({ formData: data, axiosPrivate });
      if (response) {
        const token = response?.token ?? "";
        localStorage.setItem("token", token);

        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error?.message ?? "Error occurred during Sign in", {
        position: "top-right",
        className: "text-xs",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full flex bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left side with image */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-600 to-blue-500 relative">
          <img
            src={eventImage}
            alt="Event Management"
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
            <div>
              <h2 className="text-white text-3xl font-bold mb-2">
                Welcome Back!
              </h2>
              <p className="text-gray-200">
                Sign in to manage events or discover amazing experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Right side with form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 uppercase">
              Sign In
            </h1>
            <p className="text-sm font-semibold">Wellcome to Dashboard</p>
            {/* <p className="mt-2 text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign up
              </Link>
            </p> */}
          </div>

          <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <HIMSEmailField
                displayLabel="Email"
                isRequired
                placeholderText="Enter Email"
                classNames="text-gray-700 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                {...register("email")}
                error={errors.email?.message?.toString()}
              />
            </div>

            <div className="relative">
              <TBHMSPasswordField
                displayLabel="Password"
                classNames="text-gray-700 text-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholderText="Enter Password"
                isRequired
                {...register("password")}
                error={errors.password?.message?.toString()}
              />
            </div>

            {/* <div className="py-3 pl-1">
              <p className="font-medium text-sm">
                Select your role <span className="text-red-600">*</span>
              </p>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex text-xs items-center gap-2">
                  <input
                    type="radio"
                    value="Organizer"
                    {...register("role")}
                    className="accent-blue-600 size-3 cursor-pointer"
                  />
                  Organizer
                </label>
                <label className="flex text-xs items-center gap-2">
                  <input
                    type="radio"
                    value="Participant"
                    {...register("role")}
                    className="accent-blue-600 size-3 cursor-pointer"
                  />
                  Participant
                </label>
              </div>
              {errors.role && (
                <p className="text-red-600 text-[10px] mt-1">
                  {errors.role.message}
                </p>
              )}
            </div> */}

            <div>
              {isLoading ? (
                <button
                  type="submit"
                  className="w-full flex items-center gap-3 justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary cursor-pointer"
                >
                  <ImSpinner3 className="animate-spin" /> Please wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary cursor-pointer"
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
