import { getOTP as getOTPFetch } from "@anatoquiz/services/otp/getOTP";
import { putOTP as putOTPFetch } from "@anatoquiz/services/otp/putOTP";
import { IGetOTPParams, IPutOTPRequestBody } from "@anatoquiz/types/otpTypes";
import {
  QueryObserverResult,
  RefetchOptions,
  UseMutateFunction,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { Dispatch, SetStateAction, useState } from "react";

interface IUseOTPModal {
  putOTP: UseMutateFunction<void, Error, IPutOTPRequestBody, unknown>;
  getOTP: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<void, Error>>;
  otpParams: IGetOTPParams;
  setOTPParams: Dispatch<SetStateAction<IGetOTPParams>>;
}

export function useOTPModal(): IUseOTPModal {
  const [otpParams, setOTPParams] = useState<IGetOTPParams>({
    email: "",
    value: "",
  });

  const { mutate: putOTP } = useMutation({
    mutationKey: ["put-otp"],
    mutationFn: putOTPFetch,
    onError: () => {},
    onSuccess: () => {},
    retry: false,
  });

  const { refetch: getOTP, isLoading } = useQuery({
    queryKey: ["get-otp", otpParams],
    queryFn: () => getOTPFetch(otpParams),
    enabled: false,
    retry: false,
  });

  return { putOTP, getOTP, otpParams, setOTPParams };
}
