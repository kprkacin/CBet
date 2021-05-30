export const calculateCoefficient = (
  avg: number | null,
  value: number | null
) => {
  if (!value || !avg) {
    return '0';
  }
  const base = 1.1;

  if (value > avg) {
    return ((value / avg) * base).toFixed(4);
  }
  return ((avg / value) * base).toFixed(4);
};
