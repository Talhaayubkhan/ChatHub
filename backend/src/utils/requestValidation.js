export const parsePositiveInteger = (value, fallback, maximum) => {
  const candidate = value === undefined ? fallback : Number(value);

  if (!Number.isInteger(candidate) || candidate < 1 || candidate > maximum) {
    throw new Error(
      `Value must be a positive integer no greater than ${maximum}`
    );
  }

  return candidate;
};
