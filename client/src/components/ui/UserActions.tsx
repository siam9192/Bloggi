"use client";
import React, { useEffect, useState } from "react";
import { SlOptionsVertical } from "react-icons/sl";
import ConfirmPopup from "../popup/ConfirmPopup";
import { EUserStatus } from "@/types/user.type";
import { useChangeUserStatusMutation, useDeleteUserMutation } from "@/redux/features/user/user.api";
import successToast from "../toast/SuccessToast";
import errorToast from "../toast/ErrorToast";

const actions = [
  {
    name: "Active",
    alertMessage: "Are you sure you want to active this user",
  },
  {
    name: "Block",
    alertMessage: "Are you sure you want to block this user",
  },
  {
    name: "Delete",
    alertMessage: "Are you sure you want to delete this user",
  },
];

interface IProps {
  status: `${EUserStatus}`;
  userId: number;
}

const UserActions = ({ status, userId }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [action, setAction] = useState<number | null>(null);

  useEffect(() => {
    const nodeManageOptions = document.getElementById("manage-options");
    const handler = (event: MouseEvent) => {
      if (!nodeManageOptions) return;
      const target = event.target;
      if (!nodeManageOptions.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [isOpen]);

  const [deleteUser] = useDeleteUserMutation();
  const [changeUserStatus] = useChangeUserStatusMutation();

  const handelDeleteUser = async () => {
    try {
      const res = await deleteUser(userId);
      if (!res.data?.success) {
        throw new Error();
      }
      successToast("User deleted successfully");
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const handelChangeStatus = async (status: string) => {
    try {
      const payload = {
        user_id: userId,
        status,
      };
      const res = await changeUserStatus(payload);
      if (!res.data?.success) {
        throw new Error();
      }
      successToast("User status changed successfully");
    } catch (error) {
      errorToast("Something went wrong");
    }
  };

  const handelOnConfirm = () => {
    const actionName = actions[action!].name;
    setAction(null);

    switch (actionName) {
      case "Active":
        handelChangeStatus("Active");
        break;
      case "Block":
        handelChangeStatus("Blocked");
        break;
      case "Delete":
        handelDeleteUser();
        break;
    }
  };

  const handelOnCancel = () => {
    setAction(null);
  };

  return (
    <>
      <div className="relative">
        <button onClick={() => setIsOpen(true)}>
          <SlOptionsVertical />
        </button>
        {isOpen && (
          <div
            id="manage-options"
            className=" absolute top-9 right-0  p-5 bg-primary_color text-white z-40 shadow-2xl  rounded-md w-52 h-min-52 space-y-2"
          >
            {status === "Active" ? (
              <button className={`block`} onClick={() => setAction(1)}>
                Block
              </button>
            ) : (
              <button className={`block text-green-500`} onClick={() => setAction(0)}>
                Unblock
              </button>
            )}
            <button onClick={() => setAction(2)} className={`block text-red-500`}>
              Delete User
            </button>
          </div>
        )}
      </div>
      {action !== null && (
        <ConfirmPopup
          onCancel={handelOnCancel}
          onConfirm={handelOnConfirm}
          heading={actions[action].alertMessage}
        />
      )}
    </>
  );
};

export default UserActions;
