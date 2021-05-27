export const calculateCoefficient = (
  value: number | null,
  avg: number | null
) => {
  if (!value || !avg) {
    return 0;
  }
  const difference = Math.abs(avg - value);
  if (difference > avg) {
    return Math.ceil(difference / avg) * 100;
  }
  return Math.ceil(avg / difference) * 100;
};
