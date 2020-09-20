import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controller/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsCotroller = new AppointmentsController();
const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', appointmentsCotroller.create);

export default appointmentsRouter;
