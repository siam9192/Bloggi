import { calculatePagination } from "../../helpers/paginationHelper";
import { IPaginationOptions } from "../../interfaces/pagination";
import prisma from "../../shared/prisma";

const getStaffsFromDB = async (paginationOptions: IPaginationOptions) => {
  const { skip, limit, page, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const data = await prisma.staff.findMany({
      orderBy: {
      [sortBy]: sortOrder,
    },
  });
};

// const CreateS;

const StaffServices = {
  getStaffsFromDB,
};

export default StaffServices;
