import { IMember } from "./member.type";

export interface ISubscription {
  package: string;
  payment: string;
  member: string | IMember;
  listing_limit: number;
  listing_complete: number;
  expire_date: Date;
  status: `${ESubscriptionStatus}`;
  createdAt: Date;
}

export enum ESubscriptionStatus {
  ACTIVE = "Active", // Subscription is currently active
  EXPIRED = "Expired", // Subscription has expired
  LIMIT_REACHED = "LimitReached", // Listing limit has been reached
  PENDING_RENEWAL = "PendingRenewal", // Subscription is pending renewal
  CANCELED = "Canceled", // Subscription was canceled by the user
  SUSPENDED = "Suspended", // Subscription is temporarily on hold
}
