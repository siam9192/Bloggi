import React, { useState } from "react";

interface IProps {
  onSubmit(time: string): void;
  defaultValue?: string;
}

function TimePicker({ onSubmit, defaultValue }: IProps) {
  const [time, setTime] = useState(defaultValue || null);

  const handelOnSubmit = () => {
    if (time) {
      onSubmit(time);
    }
  };

  return (
    <div className="space-y-2 select-none">
      <label className="text-gray-700 text-sm font-medium">Select Time:</label>
      <input
        type="time"
        onChange={(e) => setTime(e.target.value)}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="text-end">
        <button className="px-4 py-2  bg-blue-600 text-white rounded-md" onClick={handelOnSubmit}>
          Ok
        </button>
      </div>
    </div>
  );
}

export default TimePicker;
