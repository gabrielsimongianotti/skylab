import { inject, injectable } from 'tsyringe';
import ICacheProvicer from '@shared/container/provider/CacheProvider/models/ICacheProvider';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import Appointment from '../infra/typeorm/entities/Appointment';

interface IRequestDTO {
  provider_id: string;
  month: number;
  day: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvicer,
  ) { }

  public async execute({
    provider_id,
    month,
    year,
    day,
  }: IRequestDTO): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('s');

    console.log(cacheData);

    const appointments = this.appointmentsRepository.findAllInDayFromProvider({
      provider_id,
      month,
      year,
      day,
    });

    return appointments;
  }
}

export default ListProviderAppointmentsService;
