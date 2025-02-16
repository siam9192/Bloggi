"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDate = exports.getPaginationOptions = exports.generateSlug = void 0;
const constant_1 = require("./constant");
function generateSlug(name) {
    return name
        .toLowerCase() // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .trim(); // Remove leading/trailing spaces
}
exports.generateSlug = generateSlug;
const getPaginationOptions = (query) => {
    const object = {};
    for (const key in query) {
        if (constant_1.paginationOptionKeys.includes(key)) {
            object[key] = query[key];
        }
        else {
            continue;
        }
    }
    return object;
};
exports.getPaginationOptions = getPaginationOptions;
const validateDate = (date) => {
    return !isNaN(new Date(date).getTime());
};
exports.validateDate = validateDate;
