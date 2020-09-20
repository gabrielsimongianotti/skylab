import Appointment from "../infra/typeorm/entities/Appointment";

export default interface ICreateAppointmentDTO {
  provider_id: string;
  date: Date;
}
