import React from "react";
import { Table } from "../utils/types";
import { useStore } from "../utils/store";

export function TableGrid() {
  const { tables, selectTable, selectedTable, getAvailableTables } = useStore();
  const availableTables = getAvailableTables();

  if (tables.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Please select a date and time to view available tables.
        </p>
      </div>
    );
  }

  if (availableTables.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          Sorry, no tables available for the selected time slot.
        </p>
        <p className="text-gray-500 mt-2">
          Please try a different date or time.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`
            bg-white rounded-lg p-4 border-2 transition-all duration-200
            ${
              !table.isAvailable
                ? "opacity-50 cursor-not-allowed border-gray-200"
                : "cursor-pointer hover:border-primary-600"
            }
            ${
              selectedTable?.id === table.id
                ? "border-primary-600"
                : "border-transparent"
            }
          `}
          onClick={() => table.isAvailable && selectTable(table)}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold">Table {table.number}</h3>
              <p className="text-gray-600">{table.seats} seats</p>
            </div>
            <span
              className={`
                px-3 py-1 rounded-full text-sm font-medium
                ${
                  table.isAvailable
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }
              `}
            >
              {table.isAvailable ? "Available" : "Booked"}
            </span>
          </div>
          {table.isAvailable && (
            <p className="text-sm text-gray-500">Click to select this table</p>
          )}
        </div>
      ))}
    </div>
  );
}
