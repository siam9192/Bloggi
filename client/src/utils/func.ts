import errorToast from "@/components/toast/ErrorToast";
import successToast from "@/components/toast/SuccessToast";
import { logout } from "@/services/auth.service";
import { IParam } from "@/types/response.type";
import { SearchParams } from "next/dist/server/request/search-params";
import { ReadonlyURLSearchParams } from "next/navigation";

export const handelLogout = async () => {
  const success = await logout();
  if (!success) {
    errorToast("Something went wrong", { position: "top-right" });
  } else {
    successToast("Logout successful", { position: "bottom-left" });
  }
};

export const getFormValues = (target: HTMLFormElement, names: string[]) => {
  const obj: Record<string, string> = {};
  names.forEach((name) => {
    const input = target.elements.namedItem(name) as HTMLInputElement | null;
    if (input) {
      obj[name] = input.value;
    }
  });
  return obj;
};

export const dataURLtoFile = (dataurl: any) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  let file = new File([u8arr], "no name", { type: mime });
  return file;
};

export const paramsToString = (params: IParam[]) => {
  const searchParams = new URLSearchParams();
  params.forEach((param) => {
    if (param.value) {
      searchParams.append(param.name, param.value.toString());
    }
  });
  return searchParams.toString();
};

export const getSearchParamsToString = (
  searchParams: URLSearchParams,
  newParams: Record<string, string | null>,
  acceptableSearchParamsName: string[],
  options?: { disableReset: boolean },
): string => {
  const urlSearchParams = new URLSearchParams();

  acceptableSearchParamsName.forEach((name) => {
    const newValue = newParams[name];
    const existingValue = searchParams.get(name);

    if (typeof newValue === "string" && newValue) {
      urlSearchParams.set(name, newValue);
    } else if (options?.disableReset && existingValue) {
      urlSearchParams.append(name, existingValue);
    }
  });

  return urlSearchParams.toString();
};

export const getTimeAgo = (date: string): string => {
  const currentDate = new Date().getTime();
  const targetDate = new Date(date).getTime();
  const difference = currentDate - targetDate; // Time difference in milliseconds

  const minutes = 60 * 1000;
  const hours = 60 * minutes;
  const days = 24 * hours;

  if (difference >= days) {
    return `${Math.floor(difference / days)} days ago`;
  }
  if (difference >= hours) {
    return `${Math.floor(difference / hours)} hours ago`;
  }
  if (difference >= minutes) {
    return `${Math.floor(difference / minutes)} minutes ago`;
  }

  return `just now`;
};

export const getSearchUrl = (
  pathname: string,
  searchParams: URLSearchParams,
  newParams: IParam[],
  acceptableSearchParamsName: string[],
) => {
  const urlSearchParams = new URLSearchParams(searchParams);
  const rejectValues = ["any", null, undefined, ""];
  newParams.forEach((param) => {
    if (param.value) {
      urlSearchParams.set(param.name, param.value as string);
    } else urlSearchParams.delete(param.name);
  });
  const paramsString = urlSearchParams.toString();
  return pathname + paramsString ? `?${paramsString}` : "";
};
