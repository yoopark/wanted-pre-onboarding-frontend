export const isStringArrayType = (data: unknown) => {
  if (!Array.isArray(data)) {
    return false;
  }
  return data.every((item) => typeof item === 'string');
};
