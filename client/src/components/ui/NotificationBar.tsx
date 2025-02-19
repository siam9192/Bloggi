"use client";
import { getTimeAgo } from "@/utils/func";
import { useRouter } from "next/navigation";
import React, { UIEvent, useEffect, useRef, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { PiBell, PiBellSimpleRinging } from "react-icons/pi";

const NotificationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const notification = [
    {
      id: "cjld2cjxh0000qzrmn831i7rn",
      userId: "user1",
      type: "System",
      title: "Welcome to our platform!",
      message: "Thank you for signing up. We’re excited to have you!",
      imageUrl: null,
      isRead: false,
      createdAt: "2025-02-19T12:00:00Z",
      updatedAt: "2025-02-19T12:00:00Z",
      link: "/welcome",
    },
    {
      id: "cjld2cjxh0001qzrmn831i7rn",
      userId: "user2",
      type: "Alert",
      title: "Security Alert",
      message: "Suspicious login attempt detected on your account.",
      imageUrl: "https://example.com/alert.png",
      isRead: false,
      createdAt: "2025-02-19T12:05:00Z",
      updatedAt: "2025-02-19T12:05:00Z",
      link: "/security",
    },
    {
      id: "cjld2cjxh0002qzrmn831i7rn",
      userId: "user3",
      type: "System",
      title: "New Feature Available",
      message: "Check out our latest feature to enhance your experience!",
      imageUrl: null,
      isRead: false,
      createdAt: "2025-02-19T12:10:00Z",
      updatedAt: "2025-02-19T12:10:00Z",
      link: "/features",
    },
    {
      id: "cjld2cjxh0003qzrmn831i7rn",
      userId: "user4",
      type: "Alert",
      title: "Password Expiring Soon",
      message: "Your password will expire in 3 days. Update it now.",
      imageUrl: "https://example.com/password.png",
      isRead: true,
      createdAt: "2025-02-19T12:15:00Z",
      updatedAt: "2025-02-19T12:15:00Z",
      link: "/change-password",
    },
    {
      id: "cjld2cjxh0004qzrmn831i7rn",
      userId: "user5",
      type: "System",
      title: "Maintenance Scheduled",
      message: "Our platform will undergo maintenance at midnight.",
      imageUrl: null,
      isRead: false,
      createdAt: "2025-02-19T12:20:00Z",
      updatedAt: "2025-02-19T12:20:00Z",
      link: "/maintenance",
    },
    {
      id: "cjld2cjxh0005qzrmn831i7rn",
      userId: "user6",
      type: "Alert",
      title: "Unusual Activity",
      message: "We detected unusual activity on your account. Please review.",
      imageUrl: "https://example.com/activity.png",
      isRead: false,
      createdAt: "2025-02-19T12:25:00Z",
      updatedAt: "2025-02-19T12:25:00Z",
      link: "/activity",
    },
    {
      id: "cjld2cjxh0006qzrmn831i7rn",
      userId: "user7",
      type: "System",
      title: "Survey Invitation",
      message: "Help us improve by taking this quick survey.",
      imageUrl: null,
      isRead: true,
      createdAt: "2025-02-19T12:30:00Z",
      updatedAt: "2025-02-19T12:30:00Z",
      link: "/survey",
    },
    {
      id: "cjld2cjxh0007qzrmn831i7rn",
      userId: "user8",
      type: "Alert",
      title: "Billing Issue",
      message: "There was an issue processing your payment. Please update your info.",
      imageUrl: "https://example.com/billing.png",
      isRead: false,
      createdAt: "2025-02-19T12:35:00Z",
      updatedAt: "2025-02-19T12:35:00Z",
      link: "/billing",
    },
    {
      id: "cjld2cjxh0008qzrmn831i7rn",
      userId: "user9",
      type: "System",
      title: "Exclusive Offer",
      message: "Enjoy a 20% discount for being a loyal customer!",
      imageUrl: null,
      isRead: false,
      createdAt: "2025-02-19T12:40:00Z",
      updatedAt: "2025-02-19T12:40:00Z",
      link: "/offers",
    },
    {
      id: "cjld2cjxh0009qzrmn831i7rn",
      userId: "user10",
      type: "Alert",
      title: "Email Verification Needed",
      message: "Please verify your email to continue using our services.",
      imageUrl: "https://example.com/verify.png",
      isRead: false,
      createdAt: "2025-02-19T12:45:00Z",
      updatedAt: "2025-02-19T12:45:00Z",
      link: "/verify-email",
    },
  ];
  const [notifications,setNotifications] = useState(notification)
  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter();
  const barRef = useRef<HTMLDivElement>(null);
  const handelOnClick = (notification: any) => {
    if (notification.link) {
      router.push(notification.link);
    }
  };

  useEffect(() => {
    const bar = barRef.current

    if (!bar) return;
    const handler = (event: Event) => {
      if (bar.scrollTop + bar.clientHeight >= bar.scrollHeight) {
        console.log("Rechead")
       const arr =  notifications;

       arr.push(notification[1])
       setNotifications(arr)
      }
    };

    const handler2 = (event: MouseEvent) => {
      const target = event.target;
      if (!bar.contains(target as Node)) {
        setIsOpen(false);
      }
    };
  
    // bar.addEventListener("scroll", handler);
    document.addEventListener("click", handler2);

    return () => {
      // bar.removeEventListener("scroll", handler);
      document.removeEventListener("click", handler2);
    };
  }, [isOpen,barRef.current?.onscroll]);

 
  const handleOnScroll = (event: UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement; // Cast to HTMLDivElement
    
    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      setIsLoading(true)
      setTimeout(()=>{
        setNotifications((prevNotifications) => [
          ...prevNotifications, 
          notification[1] 
        ]);
      },10000)
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-4xl p-2  bg-gray-50  rounded-full relative"
      >
        <PiBell />
        <div className="size-5 flex justify-center items-center bg-red-500 rounded-full absolute  -top-1  right-0 text-[0.6rem] text-white">
          {20}
        </div>
      </button>

      {isOpen && (
        <div
          id="notification-bar"
          ref={barRef}
          onScroll={handleOnScroll}
          className="absolute right-0 w-60 h-60 overflow-y-auto no-scrollbar p-3 bg-white shadow-2xl  rounded-md "
        >
          <h3 className="text-xl font-semibold font-jost">Notifications</h3>
          <div className=" mt-2">
            {notifications.map((notification, index) => (
              <div
                key={index}
                onClick={() => handelOnClick(notification)}
                className="p-2 flex  gap-1 hover:bg-gray-50 hover:cursor-pointer z-50"
              >
                <div className={`${!notification.isRead ? "text-red-600" : "text-green-600"}`}>
                  <span>
                    <GoDotFill />
                  </span>
                </div>
                <div>
                  <p className="text-gray-600 text-[0.8rem]">
                    {getTimeAgo(notification.createdAt)}
                  </p>
                  <h2 className="text-[1rem] font-medium">{notification.title}</h2>
                  <p>{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
         {
          isLoading &&  <p className="mt-1 text-gray-700 font-medium">
          Loading..
        </p>
         }
        </div>
      )}
    </div>
  );
};

export default NotificationBar;
