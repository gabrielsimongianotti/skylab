import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controller/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controller/ProviderAppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsCotroller = new AppointmentsController();
const providerAppointmentsCotroller = new ProviderAppointmentsController();
const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsCotroller.index);

appointmentsRouter.get('/me', providerAppointmentsCotroller.index);

export default appointmentsRouter;
