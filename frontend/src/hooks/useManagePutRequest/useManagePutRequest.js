import { toast } from "react-toastify";
import { usePutRequest } from "../usePutRequest/usePutRequest";

export const useManagePutRequest = () => {
  const [executePutRequest] = usePutRequest();

  const managePutRequest = async (api, payload, callbackSuccess) => {
    const response = await executePutRequest(api, payload);
    if (response && response.status && response.status === 200) {
      toast.success(response?.data?.message);
      callbackSuccess(response);
    } else {
      toast.error(response?.data?.message);
    }
    return response;
  };

  return [managePutRequest];
};
