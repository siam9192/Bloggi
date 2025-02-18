export function objectUpdateFormat(doc: any, fields: string[]) {
  let result: any = {};
  Object.entries(doc).forEach(([key, value]) => {
    //
    const findField = fields.map((field) => field === key);
    if (!findField) {
      result[key] = value;
    }
  });

  fields.forEach((field) => {
    if (doc[field]) {
      Object.entries(doc[field]).forEach(([key, value]) => {
        result[`${field}.${key}`] = value;
      });
    }
  });
  return result;
}
