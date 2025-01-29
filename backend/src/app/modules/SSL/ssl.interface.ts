export interface ICreateSSLPaymentSessionPayload {
  transactionId: string;
  amount: number;
  customer: {
    name: string;
    email: string | null;
    phone: string | null;
  };
}
