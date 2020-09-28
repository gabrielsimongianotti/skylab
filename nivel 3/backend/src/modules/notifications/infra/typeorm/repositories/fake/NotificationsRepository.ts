import { ObjectID } from 'mongodb';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationsDTO from '@modules/notifications/dtos/ICreateNotificationsDTO';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notifications';

class NotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationsDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), content, recipient_id });

    await this.notifications.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
