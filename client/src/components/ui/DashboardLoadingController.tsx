"use client";
import React, { ReactNode, use } from "react";
import LoadingPage from "../loading/LoadingPage";
import { useCurrentUser } from "@/provider/CurrentUserProvider";

interface IProps {
  children: ReactNode;
}

const DashboardLoadingController = ({ children }: IProps) => {
  const { isLoading, user } = useCurrentUser();
  if (isLoading) return <LoadingPage />;
  if (!isLoading && !user) throw new Error("Something went wrong!");
  else return children;
};

export default DashboardLoadingController;
