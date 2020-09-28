import { Router } from 'express';

import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controller/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controller/ProviderMonthAvailabilityController';
import ProvidersController from '@modules/appointments/infra/http/controller/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersCotroller = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

const prvidersRouter = Router();

prvidersRouter.use(ensureAuthenticated);

prvidersRouter.get('/', providersCotroller.index);

prvidersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

prvidersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default prvidersRouter;
