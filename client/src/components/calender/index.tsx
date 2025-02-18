"use client";
import React, { useEffect, useState } from "react";
import { BsXLg } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface IProps {
  onClose(): void;
  onSelect(date: Date): void;
  defaultValue?: Date;
}

const Calender = ({ onClose, onSelect, defaultValue }: IProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState<Date[]>([]);
  const [startDay, setStartDay] = useState<number | null>(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue || new Date());

  const startDate = new Date(new Date().toDateString());
  const endDate = new Date(new Date().toDateString());
  endDate.setMonth(startDate.getMonth() + 1);

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const dayNames = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handelDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  const checkIsDisabled = (date: Date) => {
    if (startDate && endDate) {
      return date < startDate || date > endDate;
    } else if (startDate) {
      return date < startDate;
    } else if (endDate) {
      return date > endDate;
    } else return false;
  };

  const handelOnClose = () => {
    setSelectedDate(new Date());
    onClose();
  };

  const handelOnSelect = () => {
    onSelect(selectedDate as Date);
  };

  return (
    <div className="calender w-full bg-white  rounded-md space-y-4">
      <h1>Select Date:</h1>
      <div className="header bg-primary_color text-white px-2 py-4 flex justify-between items-center rounded-md">
        <button type="button" onClick={prevMonth} className="text-xl p-2 bg-blue-500 rounded-full">
          <FaChevronLeft />
        </button>
        <span>
          {currentDate.toLocaleDateString("default", { month: "long" })} {currentDate.getFullYear()}
        </span>
        <button type="button" onClick={nextMonth} className="text-xl p-2 bg-blue-500 rounded-full">
          <FaChevronRight />
        </button>
      </div>

      <div className="days  grid grid-cols-7 gap-2 ">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay! }).map((_, index) => (
          <div className="empty-day   size-8 text-[0.9rem] text-center" key={index}></div>
        ))}
        {daysInMonth.map((day) => (
          <button
            type="button"
            key={day.toString()}
            className={`day bg-gray-200 disabled:bg-gray-50   size-8 text-[0.9rem] flex justify-center items-center  rounded-full text-center   ${day.getDate() === new Date().getDate() && day.getMonth() === new Date().getMonth() ? "today" : ""} ${selectedDate && day.toDateString() === selectedDate.toDateString() ? "selected bg-purple-700 text-white" : ""}`}
            disabled={checkIsDisabled(day)}
            onClick={() => handelDateClick(day)}
          >
            {day.getDate()}
          </button>
        ))}
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={handelOnClose} className="text-red-500">
          Close
        </button>
        <button type="button" onClick={handelOnSelect} className="text-blue-500">
          Ok
        </button>
      </div>
    </div>
  );
};

export default Calender;
