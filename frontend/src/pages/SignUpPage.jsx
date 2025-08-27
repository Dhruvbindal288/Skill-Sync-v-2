/* eslint-disable no-unused-vars */
import { useState } from "react";
import call from "../assets/call.png";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { signup } from "../lib/api";
function SignUpPage() {
  const [signupData, setSignupData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const queryClient=useQueryClient();
const {mutate,isPending,error}=useMutation({
  mutationFn:signup,
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:["authUser"]});
     toast.success("Signup successfully")
  },
  onError: (err) => {
      
      toast.error(err.response?.data?.message || "Something went wrong")
    },
})


  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(signupData)
  };

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="bg-blue-200 w-full lg:w-[70%] h-screen lg:h-[80%] lg:rounded-3xl flex flex-col-reverse lg:flex-row p-6 lg:p-10 gap-6 lg:gap-10">
        
        {/* Form Section */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl text-amber-500 font-bold mb-6">SkillSync</h1>
          <h1 className="text-2xl text-white font-bold mb-6">
            Create an account
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fullname" className="block mb-1 font-medium">
                Full Name:
              </label>
              <input
                type="text"
                id="fullname"
                placeholder="example Dhruv"
                className="focus:outline-none border rounded w-full lg:w-96 p-2"
                value={signupData.fullname}
                onChange={(e) => {
                  setSignupData({ ...signupData, fullname: e.target.value });
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="focus:outline-none border rounded w-full lg:w-96 p-2"
                value={signupData.email}
                onChange={(e) => {
                  setSignupData({ ...signupData, email: e.target.value });
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 font-medium">
                Password:
              </label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                className="focus:outline-none border rounded w-full lg:w-96 p-2"
                value={signupData.password}
                onChange={(e) => {
                  setSignupData({ ...signupData, password: e.target.value });
                }}
                required
              />
              <p className="opacity-45">Password must be 6 characters long</p>
            </div>

            <button 
              type="submit" 
              className="bg-blue-500 text-white w-full lg:w-96 py-2 rounded-xl text-lg lg:text-xl"
            >
              {isPending?"Signing up..":"Create Account"}
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="flex-1 flex items-center justify-center">
          <img
            src={call}
            alt="SignUp"
            className="w-full max-w-sm lg:max-w-md object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
