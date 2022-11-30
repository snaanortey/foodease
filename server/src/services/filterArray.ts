export const itemsToExclude = ["Container", "Food", "Vegetable", "Tableware", "Table", "Spoon", "Fork", "Knife", "Plate"];

export function filterArray(array: string[], values: string[]): string[] {
  const predicate = (element: string): boolean => {
    return !values.includes(element);
  };
  const newArray = array.filter(predicate);
  return newArray;
}


