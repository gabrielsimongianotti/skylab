import { Router } from 'express';

import { container } from 'tsyringe';

import AppointmentController from '@modules/appointments/infra/controller/AppointmentsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsCotroller = new AppointmentController();
const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

// Rota GET
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

// Rota POST
appointmentsRouter.post('/', appointmentsCotroller.create);

export default appointmentsRouter;
