import prisma from "../../shared/prisma";

export const generateTransactionId = async (length = 10) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let transactionId = "";
  while (!transactionId) {
    let newTransactionId = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      newTransactionId += characters[randomIndex];
      const payment = await prisma.payment.findFirst({
        where: {
          transaction_id: newTransactionId,
        },
      });
      if (payment) {
        continue;
      } else transactionId = newTransactionId;
    }
  }
  return transactionId;
};
