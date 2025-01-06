"use client";
import React, { useState } from "react";
import { useStore } from "../utils/store";
import { toast } from "sonner";
import { TableGrid } from "./TableGrid";
import { DateTimePicker } from "./DateTimePicker";

export function BookingDetails() {
  const {
    selectedTable,
    selectedDate,
    selectedTime,
    addReservation,
    userDetails,
    resetBooking,
    setDateTime,
  } = useStore();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirm = () => {
    if (!selectedTable || !userDetails) {
      toast.error("Please select a table");
      return;
    }

    if (userDetails.guests > selectedTable.seats) {
      toast.error(
        `Maximum ${selectedTable.seats} guests allowed for this table`
      );
      return;
    }

    const reservation = {
      id: Date.now(),
      tableId: selectedTable.id,
      tableNumber: selectedTable.number,
      name: userDetails.name,
      phone: userDetails.phone,
      email :"",
      date: selectedDate,
      time: selectedTime,
      guests: userDetails.guests,
    };

    addReservation(reservation);
    setIsConfirmed(true);
  };

  if (isConfirmed) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">Booking Confirmed!</h3>
          <p className="text-gray-600">
            Your table has been reserved successfully.
          </p>
        </div>

        <div className="border-t border-b border-gray-100 py-4 my-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-medium">{userDetails?.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-medium">{userDetails?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">
                {new Date(selectedDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">{selectedTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Table</p>
              <p className="font-medium">Table {selectedTable?.number}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Guests</p>
              <p className="font-medium">{userDetails?.guests}</p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            resetBooking();
            setIsConfirmed(false);
          }}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Make Another Booking
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-6">Select Date & Time</h2>
        <DateTimePicker />
      </div>

      {selectedDate && selectedTime && (
        <div>
          <h2 className="text-xl font-semibold mb-6">Select Your Table</h2>
          <TableGrid />
        </div>
      )}

      {selectedTable && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setDateTime("", "")}
            className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleConfirm}
            className="bg-primary-600 text-white py-2 px-6 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Confirm Booking
          </button>
        </div>
      )}
    </div>
  );
}
