
import { useLocation} from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { axiosinstance } from "../lib/axios";
function Navbar() {
  const location = useLocation();
const queryClient = useQueryClient();
  
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosinstance.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      
      toast.success("Logged out successfully")
      queryClient.invalidateQueries({ queryKey: ["autherUser"] });
    },
    onError: (error) => {
      toast.error(error,"Logout failed. Please try again.");
    },
    });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-blue-100 sticky top-0 z-50">
      {location.pathname.startsWith("/chat/") ? (
  <h1 className="text-2xl font-bold text-amber-500 cursor-pointer">
    SkillSync
  </h1>
) : (
  <span />
)}

      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
          disabled={logoutMutation.isLoading}
        >
          {logoutMutation.isLoading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
