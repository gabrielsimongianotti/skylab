import { format, getHours, isBefore, startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvicer from '@shared/container/provider/CacheProvider/models/ICacheProvider';
import AppError from '@shared/erros/AppError';

interface IRequestDTO {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvicer,
  ) {}

  public async execute({
    date,
    user_id,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This time is already booked.');
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can´t create an appointment on a past date.');
    }

    if (user_id === provider_id) {
      throw new AppError('You can´t create your self.');
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        `You can only create appointments between 8am and  5pm ${appointmentDate}`,
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormat = format(appointmentDate, "dd/MM/yyyy 'ás' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novoagendamento para dia ${dateFormat}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appoinments:${provider_id}:${format(
        appointmentDate,
        'yyyy-m-d',
      )}`,
    );
    return appointment;
  }
}

export default CreateAppointmentService;
