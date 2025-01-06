import React from "react";
import { useStore } from "../utils/store";
import { toast } from "sonner";

export function BookingForm() {
  const { selectedTable, selectedDate, selectedTime, addReservation } =
    useStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!selectedTable) return;

    const guests = parseInt(formData.get("guests") as string);
    if (guests > selectedTable.seats) {
      toast.error(
        `Maximum ${selectedTable.seats} guests allowed for this table`
      );
      return;
    }

    const reservation = {
      id: Date.now(),
      tableId: selectedTable.id,
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      date: selectedDate,
      time: selectedTime,
      guests,
    };

    addReservation(reservation);
    toast.success("Reservation confirmed! Check your email for details.");
    form.reset();
  };

  if (!selectedTable) return null;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">
              Table {selectedTable.number}
            </h3>
            <p className="text-gray-600">{selectedTable.seats} seats</p>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {new Date(selectedDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600">{selectedTime}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Number of Guests (max {selectedTable.seats})
          </label>
          <input
            type="number"
            name="guests"
            required
            min="1"
            max={selectedTable.seats}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
