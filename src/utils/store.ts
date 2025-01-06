import { create } from "zustand";
import { Table, Reservation } from "./types";

interface UserDetails {
  name: string;
  phone: string;
  guests: number;
}

interface BookingStore {
  resetBooking: () => void;
  userDetails: UserDetails | null;
  tables: Table[];
  reservations: Reservation[];
  selectedTable: Table | null;
  selectedDate: string;
  selectedTime: string;
  // deleteReservation: any;
  setUserDetails: (userDetails: UserDetails) => void;
  deleteReservation: (id: number) => void;
  setTables: (tables: Table[]) => void;
  setReservations: (reservations: Reservation[]) => void;
  selectTable: (table: Table) => void;
  setDateTime: (date: string, time: string) => void;
  addReservation: (reservation: Reservation) => void;
  getAvailableTables: () => Table[];
}

// Check if a table is available for a given date and time
const isTableAvailable = (
  tableId: number,
  date: string,
  time: string,
  reservations: Reservation[]
): boolean => {
  return !reservations.some(
    (r) => r.tableId === tableId && r.date === date && r.time === time
  );
};

// Generate tables with real availability based on reservations
const generateTables = (
  date: string,
  time: string,
  reservations: Reservation[]
): Table[] => {
  // Generate random availability based on date and time
  const seed = date + time;
  const random = (min: number, max: number) => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i);
      hash = hash & hash;
    }
    return Math.floor(Math.abs(Math.sin(hash) * (max - min + 1)) + min);
  };

  return [
    {
      id: 1,
      number: 1,
      seats: 2,
      isAvailable: isTableAvailable(1, date, time, reservations),
    },
    {
      id: 2,
      number: 2,
      seats: 4,
      isAvailable: isTableAvailable(2, date, time, reservations),
    },
    {
      id: 3,
      number: 3,
      seats: 6,
      isAvailable: isTableAvailable(3, date, time, reservations),
    },
    {
      id: 4,
      number: 4,
      seats: 2,
      isAvailable: isTableAvailable(4, date, time, reservations),
    },
    {
      id: 5,
      number: 5,
      seats: 4,
      isAvailable: isTableAvailable(5, date, time, reservations),
    },
    {
      id: 6,
      number: 6,
      seats: 6,
      isAvailable: isTableAvailable(6, date, time, reservations),
    },
  ];
};

export const useStore = create<BookingStore>((set, get) => ({
  tables: [],
  reservations: [],
  userDetails: null,
  selectedTable: null,
  selectedDate: "",
  selectedTime: "",
  setTables: (tables) => set({ tables }),
  setReservations: (reservations) => set({ reservations }),
  selectTable: (table) => set({ selectedTable: table }),
  setDateTime: (date, time) => {
    set({
      selectedDate: date,
      selectedTime: time,
      selectedTable: null,
      tables:
        date && time ? generateTables(date, time, get().reservations) : [],
    });
  },
  deleteReservation: (id: number) =>
    set((state) => ({
      reservations: state.reservations.filter((r) => r.id !== id),
      tables: state.tables.map((table) =>
        table.id === state.reservations.find((r) => r.id === id)?.tableId
          ? { ...table, isAvailable: true }
          : table
      ),
    })),
  addReservation: (reservation) =>
    set((state) => ({
      reservations: [...state.reservations, reservation],
      tables: state.tables.map((table) =>
        table.id === reservation.tableId
          ? { ...table, isAvailable: false }
          : table
      ),
      selectedTable: null,
    })),
  getAvailableTables: () => get().tables.filter((table) => table.isAvailable),
  setUserDetails: (details: BookingStore["userDetails"]) =>
    set({ userDetails: details }),
  resetBooking: () =>
    set({
      userDetails: null,
      selectedTable: null,
      selectedDate: "",
      selectedTime: "",
    }),
}));
