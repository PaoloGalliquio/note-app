import { toast } from "react-toastify";
import { usePostRequest } from "../usePostRequest/usePostRequest";

export const useManagePostRequest = () => {
  const [executePostRequest] = usePostRequest();

  const managePostRequest = async (
    api,
    payload,
    callbackSuccess,
    showToast = false
  ) => {
    const response = await executePostRequest(api, payload);
    
    if (response && response.status && response.status === 200) {
      if (showToast)
        toast.success(response?.data?.message);
      callbackSuccess(response);
    } else {
      toast.error(response?.data?.message);
    }
    return response;
  };

  return [managePostRequest];
};
