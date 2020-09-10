import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordServices from '@modules/users/services/ResetPasswordServices';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordServices);

    await resetPassword.execute({ password, token });

    return response.status(204);
  }
}
