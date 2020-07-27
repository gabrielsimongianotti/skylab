import { Router } from 'express';
import appointmentsRouter from './Appointments.router';

const routes = Router();

routes.use('/appointments', appointmentsRouter);

export default routes;