"use client";
import React, { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import Calender from ".";
import TimePicker from "./TimePicker";

interface IProps {
  onChange(value: Date): void;
  defaultValue?: Date;
}

function DateTimePicker({ onChange, defaultValue }: IProps) {
  const [open, setOpen] = useState<"calender" | "time" | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(defaultValue || new Date());

  const handelTimeSubmit = (time: string) => {
    setTime(time);
    setOpen(null);
  };

  const handelSelectDate = (date: Date) => {
    setDate(date);
    setOpen("time");
  };

  useEffect(() => {
    if (date && time) {
      const selectedDate = new Date(date!);

      const [hours, minutes] = time.split(":");
      selectedDate?.setHours(parseInt(hours));
      if (minutes) {
        selectedDate.setMinutes(parseInt(minutes));
      }

      onChange(new Date(selectedDate));
      setSelectedDateTime(new Date(selectedDate));
    } else if (defaultValue) {
      onChange(new Date(defaultValue));
      setSelectedDateTime(defaultValue);
    }
  }, [date, time]);

  const defaultTime = defaultValue
    ? new Date(defaultValue).getHours() + ":" + new Date(defaultValue).getMinutes()
    : undefined;

  return (
    <div className="relative ">
      <div className="flex items-center justify-between border-2 border-gray-800 p-3 rounded-md">
        <span>{selectedDateTime ? selectedDateTime.toUTCString() : "Select date and time"}</span>
        <div className="text-xl space-x-2">
          <button type="button" onClick={() => setOpen("calender")}>
            <FaRegCalendarAlt />
          </button>
        </div>
      </div>

      {open && (
        <div className="  mt-2  shadow p-2   w-full">
          {open === "calender" ? (
            <Calender
              onSelect={handelSelectDate}
              defaultValue={defaultValue}
              onClose={() => setOpen(null)}
            />
          ) : (
            <TimePicker defaultValue={defaultTime} onSubmit={handelTimeSubmit} />
          )}
        </div>
      )}
    </div>
  );
}

export default DateTimePicker;
