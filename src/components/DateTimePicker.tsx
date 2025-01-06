import React from "react";
import { useStore } from "../utils/store";
import { TIME_SLOTS, DAYS_OF_WEEK } from "../utils/constants";

export function DateTimePicker() {
  const { selectedDate, selectedTime, setDateTime } = useStore();

  // Calendar logic
  // Set time to start of day to avoid timezone issues
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Generate calendar days
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    const prevMonthDay = new Date(currentYear, currentMonth, -i).getDate();
    days.unshift({
      day: prevMonthDay,
      date: new Date(currentYear, currentMonth - 1, prevMonthDay),
      isCurrentMonth: false,
      isSelectable: false,
    });
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i);
    const isToday = i === today.getDate();
    const isPast = date < today;
    days.push({
      day: i,
      date,
      isCurrentMonth: true,
      isToday,
      isSelectable: !isPast,
    });
  }

  const remainingDays = 42 - days.length; // 6 rows * 7 days
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      day: i,
      date: new Date(currentYear, currentMonth + 1, i),
      isCurrentMonth: false,
      isSelectable: false,
    });
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h3 className="text-lg font-medium">
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h3>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS_OF_WEEK.map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-600"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isSelected =
              selectedDate === day.date.toISOString().split("T")[0];

            return (
              <button
                key={index}
                disabled={!day.isSelectable}
                onClick={() => {
                  if (day.isSelectable) {
                    // Set time to noon to avoid timezone issues
                    const date = new Date(day.date);
                    date.setHours(12, 0, 0, 0);

                    setDateTime(date.toISOString().split("T")[0], selectedTime);
                  }
                }}
                className={`
                  p-2 text-sm rounded-lg
                  ${!day.isCurrentMonth ? "text-gray-400" : ""}
                  ${day.isToday ? "font-bold" : ""}
                  ${isSelected ? "bg-primary-600 text-white" : ""}
                  ${day.isSelectable && !isSelected ? "hover:bg-gray-100" : ""}
                  ${!day.isSelectable ? "cursor-not-allowed opacity-50" : ""}
                `}
              >
                {day.day}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-3">Available Time Slots</h4>
        <div className="grid grid-cols-3 gap-2">
          {TIME_SLOTS.map((time) => (
            <button
              key={time}
              onClick={() => setDateTime(selectedDate, time)}
              className={`
                p-2 text-sm rounded-lg border transition-colors
                ${
                  selectedTime === time
                    ? "bg-primary-600 text-white border-primary-600"
                    : "border-gray-200 hover:border-primary-600"
                }
              `}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
