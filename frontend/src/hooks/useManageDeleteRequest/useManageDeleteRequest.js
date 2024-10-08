import { toast } from "react-toastify";
import { useDeleteRequest } from "../useDeleteRequest/useDeleteRequest";

export const useManageDeleteRequest = () => {
  const [executeDeleteRequest] = useDeleteRequest();

  const manageDeleteRequest = async (api, callbackSuccess, showToastSuccess = true) => {
    const response = await executeDeleteRequest(api);

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

  return [manageDeleteRequest];
};
