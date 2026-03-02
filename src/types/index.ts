export type AppointmentStatus = 'pendente' | 'aprovado' | 'negado' | 'bloqueado';

export interface Appointment {
  id: string;
  clientName: string;
  time: string;
  service: string;
  price: number;
  duration: string;
  status: AppointmentStatus;
}