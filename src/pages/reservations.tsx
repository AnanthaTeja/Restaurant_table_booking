import "../app/globals.css";
import React from "react";
import { Navbar } from "../components/Navbar";
import { useStore } from "../utils/store";

export default function Reservations() {
  const { reservations } = useStore();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="mb-8">My Reservations</h1>
        <div className="grid gap-6">
          {reservations.length === 0 ? (
            <p className="text-gray-500">No reservations yet.</p>
          ) : (
            reservations.map((reservation) => (
              <div key={reservation.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3>Table {reservation.tableId}</h3>
                    <p className="text-gray-600 mt-1">{reservation.name}</p>
                    <p className="text-gray-600">{reservation.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(reservation.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">{reservation.time}</p>
                    <p className="text-gray-600">{reservation.guests} guests</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
