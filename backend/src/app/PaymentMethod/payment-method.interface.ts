export interface IPaymentMethodData {
  currency?: "USD";
  service_name: string;
  amount: number;
  transaction_id: string;
  success_url: string;
  cancel_url: string;
}
