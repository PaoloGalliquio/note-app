import { toast } from "react-toastify";
import { useGetRequest } from "../useGetRequest/useGetRequest";

export const useManageGetRequest = () => {
  const [executeGetRequest] = useGetRequest();

  const manageGetRequest = async (api, callbackSuccess, showToastSuccess = true) => {
    const response = await executeGetRequest(api);
    
    if (response && response.status && response.status === 200) {
      if (showToastSuccess === true) {
        toast.success(response?.data?.message);
      }

      callbackSuccess(response);
    } else {
      toast.error(response?.data?.message);
    }
    return response;
  };

  return [manageGetRequest];
};
