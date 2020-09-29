import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controller/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controller/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsCotroller = new AppointmentsController();
const providerAppointmentsCotroller = new ProviderAppointmentsController();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsCotroller.index,
);

appointmentsRouter.get('/me', providerAppointmentsCotroller.index);

export default appointmentsRouter;
