import { Router } from 'express';

import ProvidersController from '@modules/appointments/infra/http/controller/ProvidersController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const providersCotroller = new ProvidersController();

const prvidersRouter = Router();

prvidersRouter.use(ensureAuthenticated);

prvidersRouter.get('/', providersCotroller.index);

export default prvidersRouter;
