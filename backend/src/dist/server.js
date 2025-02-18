"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const app_1 = __importDefault(require("./app"));
const prisma_1 = __importDefault(require("./shared/prisma"));
const port = 5000;
function main() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      app_1.default.listen(port, () => {
        console.log("Blogi Server is Running on Port:", port);
      });
      // console.log(await prisma.category.findMany())
      setInterval(
        () =>
          __awaiter(this, void 0, void 0, function* () {
            const date30MinuteLess = new Date();
            date30MinuteLess.setMinutes(-30);
            yield prisma_1.default.payment.updateMany({
              where: {
                created_at: {
                  gt: date30MinuteLess,
                },
              },
              data: {
                status: client_1.PaymentStatus.Timeout,
              },
            });
            yield prisma_1.default.blog.updateMany({
              where: {
                publish_date: {
                  lte: new Date(),
                },
                status: client_1.BlogStatus.Published,
              },
              data: {
                status: client_1.BlogStatus.Published,
              },
            });
          }),
        2 * 60 * 1000,
      );
      setInterval(
        () =>
          __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.default.subscription.deleteMany({
              where: {
                payment: {
                  status: {
                    not: client_1.PaymentStatus.Success,
                  },
                },
              },
            });
          }),
        24 * 60 * 60 * 1000,
      );
    } catch (error) {
      console.log(error);
    }
  });
}
main();
