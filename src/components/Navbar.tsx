"use client";

import React from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-soft py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-primary-600">Table Booking</h1>
        <div className="space-x-4">
          <button onClick={() => router.push("/")} className="btn-secondary">
            Home
          </button>
          <button
            onClick={() => router.push("/reservations")}
            className="btn-secondary"
          >
            My Reservations
          </button>
        </div>
      </div>
    </nav>
  );
}
