"use client";

import { Navbar } from "../components/Navbar";
import { BookingDetails } from "../components/BookingDetails";
import { UserDetailsForm } from "../components/UserDetailsForm";
import { MyReservations } from "../components/MyReservations";
import { WhyChooseUs } from "../components/WhyChooseUs";
import { OpeningHours } from "../components/OpeningHours";
import { useStore } from "../utils/store";
import { Toaster } from "sonner";

export default function Page() {
  const { userDetails } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Toaster position="top-center" />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-3">
              Fine Dining Restaurant
            </h1>
            <p className="text-xl text-gray-600">
              Reserve your table for an unforgettable dining experience
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr,400px] gap-8">
            <div className="space-y-8">
              {!userDetails ? <UserDetailsForm /> : <BookingDetails />}
            </div>

            <div className="space-y-6">
              <WhyChooseUs />
              <OpeningHours />
              <div>
                {/* <h2 className="text-2xl font-semibold mb-4">My Reservations</h2> */}
                <MyReservations />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
