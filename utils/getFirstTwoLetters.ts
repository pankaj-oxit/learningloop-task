/** @format */

export const getFirstTwoLetters = (email: string): string => {
  const firstTwoLetters = email.slice(0, 2).toUpperCase();
  return firstTwoLetters;
};
