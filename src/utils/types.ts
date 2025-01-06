export interface Table {
  id: number;
  number: number;
  seats: number;
  isAvailable: boolean;
}

export interface Reservation {
  id: number;
  tableId: number;
  tableNumber: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}
