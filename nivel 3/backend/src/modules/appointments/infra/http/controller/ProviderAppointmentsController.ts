import { Request, Response } from 'express';
import { container } from 'tsyringe';

import listProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointment = container.resolve(
      listProviderAppointmentsService,
    );

    const appointments = await listProviderAppointment.execute({
      day,
      month,
      year,
      provider_id,
    });

    return response.json(appointments);
  }
}
