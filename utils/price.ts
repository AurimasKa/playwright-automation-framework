export const parsePriceFromText = (text: string | null): number => {
  return parseFloat(text?.replace(/[^0-9.]/g, '') || '0');
};

export const isPriceInRange = (price: number, min: number, max: number): boolean => {
  return price >= min && price <= max;
};

