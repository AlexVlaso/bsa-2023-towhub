import { type IEntity } from '~/libs/interfaces/entity.interface.js';
import { type NullableProperties } from '~/libs/types/types.js';

import { type UserEntityT } from '../users/users.js';
import { type DriverEntity as DriverEntityT } from './libs/types/types.js';

class DriverEntity implements IEntity {
  private id: DriverEntityT['id'] | null;

  private driverLicenseNumber: DriverEntityT['driverLicenseNumber'];

  private userId: DriverEntityT['userId'];

  private businessId: DriverEntityT['businessId'];

  private createdAt: DriverEntityT['createdAt'];

  private user?: UserEntityT;

  private constructor({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    createdAt,
    user,
  }: NullableProperties<DriverEntityT, 'id'> & { user?: UserEntityT }) {
    this.id = id;
    this.driverLicenseNumber = driverLicenseNumber;
    this.userId = userId;
    this.businessId = businessId;
    this.createdAt = createdAt;
    this.user = user;
  }

  public static initialize({
    id,
    driverLicenseNumber,
    userId,
    businessId,
    createdAt,
    user,
  }: DriverEntityT & { user?: UserEntityT }): DriverEntity {
    return new DriverEntity({
      id,
      driverLicenseNumber,
      userId,
      businessId,
      createdAt,
      user,
    });
  }

  public static initializeNew({
    driverLicenseNumber,
    userId,
    businessId,
    createdAt,
  }: Omit<DriverEntityT, 'id'>): DriverEntity {
    return new DriverEntity({
      id: null,
      driverLicenseNumber,
      userId,
      businessId,
      createdAt,
    });
  }

  public toObject(): DriverEntityT {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt,
    };
  }

  public toNewObject(): Omit<DriverEntityT, 'id'> {
    return {
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt,
    };
  }

  public toObjectWithUser(): DriverEntityT & { user?: UserEntityT } {
    return {
      id: this.id as number,
      driverLicenseNumber: this.driverLicenseNumber,
      userId: this.userId,
      businessId: this.businessId,
      createdAt: this.createdAt,
      user: this.user,
    };
  }
}

export { DriverEntity };
