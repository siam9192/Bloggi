import Link from "next/link";
import React from "react";

const PremiumContentAlertMessage = () => {
  return (
    <div className="p-5 ">
      <img
        src="https://cdn-icons-png.flaticon.com/512/702/702272.png"
        alt=""
        className="h-52 mx-auto"
      />
      <h1 className="text-xl font-bold">This is premium content</h1>
      <p className="mt-2">Subscribe to access this exclusive content and enjoy premium benefits.</p>
      <Link href={`/pricing`}>
        <button className="mt-8 px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition">
          Upgrade Now
        </button>
      </Link>
    </div>
  );
};

export default PremiumContentAlertMessage;
