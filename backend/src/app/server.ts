import { BlogStatus, PaymentStatus } from "@prisma/client";
import app from "./app";
import prisma from "./shared/prisma";
import OverviewServices from "./modules/Overview/overview.service";

const port = 5000;
async function main() {
  try {
    app.listen(port, () => {
      console.log("Blogi Server is Running on Port:", port);
    });

    // console.log(await prisma.category.findMany())

    setInterval(
      async () => {
        const date30MinuteLess = new Date();
        date30MinuteLess.setMinutes(-30);
        await prisma.payment.updateMany({
          where: {
            created_at: {
              gt: date30MinuteLess,
            },
          },
          data: {
            status: PaymentStatus.Timeout,
          },
        });
        await prisma.blog.updateMany({
          where: {
            publish_date: {
              lte: new Date(),
            },
            status: BlogStatus.Published,
          },
          data: {
            status: BlogStatus.Published,
          },
        });
      },
      2 * 60 * 1000,
    );

    setInterval(
      async () => {
        await prisma.subscription.deleteMany({
          where: {
            payment: {
              status: {
                not: PaymentStatus.Success,
              },
            },
          },
        });
      },
      24 * 60 * 60 * 1000,
    );
  } catch (error) {
    console.log(error);
  }
}

main();
