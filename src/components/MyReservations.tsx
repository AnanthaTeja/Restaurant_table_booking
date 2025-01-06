import React from "react";
import { useStore } from "../utils/store";

export function MyReservations() {
  const { reservations, deleteReservation } = useStore();

  if (reservations.length === 0) {
    return (
      <div className="text-center py-8 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">You don't have any reservations yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <div key={reservation.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">{reservation.name}</h3>
              <p className="text-gray-600">{reservation.phone}</p>
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to cancel this reservation?"
                  )
                ) {
                  deleteReservation(reservation.id);
                }
              }}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Date</p>
              <p className="font-medium">
                {new Date(reservation.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time</p>
              <p className="font-medium">{reservation.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Table</p>
              <p className="font-medium">Table {reservation.tableNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Guests</p>
              <p className="font-medium">
                {reservation.guests}{" "}
                {reservation.guests === 1 ? "Guest" : "Guests"}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
