import React from "react";

export const ErrorBox = ({ message }: { message?: string }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="text-red-600 font-bold">
      {message || "Something went wrong. Please try again later."}
    </div>
  </div>
);
