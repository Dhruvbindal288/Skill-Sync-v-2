import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosinstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import call from "../assets/call.png"; // use same image as signup

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosinstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Login Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-200 w-full lg:w-[70%] h-screen lg:h-[80%] lg:rounded-3xl flex flex-col-reverse lg:flex-row p-6 lg:p-10 gap-6 lg:gap-10">

        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl text-amber-500 font-bold mb-6">SkillSync</h1>
          <h1 className="text-2xl text-white font-bold mb-6">Login to your account</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="focus:outline-none border rounded w-full lg:w-96 p-2"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="focus:outline-none border rounded w-full lg:w-96 p-2"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white w-full lg:w-96 py-2 rounded-xl text-lg lg:text-xl"
            >
              {isPending ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={call}
            alt="Login"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
