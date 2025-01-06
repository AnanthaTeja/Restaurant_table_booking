import React from "react";

export function OpeningHours() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Monday - Thursday</span>
          <span>5:00 PM - 10:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Friday - Saturday</span>
          <span>5:00 PM - 11:00 PM</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Sunday</span>
          <span>4:00 PM - 9:00 PM</span>
        </div>
      </div>
    </div>
  );
}
