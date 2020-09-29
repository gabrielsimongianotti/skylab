import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import SessionsController from '../../controller/SessionsController';

const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
