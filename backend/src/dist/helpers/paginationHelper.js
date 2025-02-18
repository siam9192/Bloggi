"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (options) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 12;
  const sortBy = options.sortBy || "created_at";
  const sortOrder = options.sortOrder || "desc";
  const skip = (page - 1) * limit;
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
exports.calculatePagination = calculatePagination;
