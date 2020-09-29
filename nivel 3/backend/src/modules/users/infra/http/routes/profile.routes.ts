import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ProfileController from '../../controller/ProfileController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

profileRouter.get(
  '/',
  celebrate({ [Segments.BODY]: {} }),
  profileController.show,
);

export default profileRouter;
