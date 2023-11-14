export const findMostCommonPropertyValue = <
  T extends Record<K, V>,
  K extends keyof T,
  V extends string | number
>(
  arr: T[],
  prop: K
): V | null => {
  const counts: Record<string, number> = {};
  let maxCount = 0;
  let maxPropValue: V | null = null;

  for (const obj of arr) {
    const propValue = obj[prop];
    const key = String(propValue); // Convert propValue to string for use as an object key

    if (key in counts) {
      counts[key]++;
    } else {
      counts[key] = 1;
    }
  }

  for (const key in counts) {
    if (counts[key] > maxCount) {
      maxCount = counts[key];
      maxPropValue = key as unknown as V; // Cast key back to type V
    }
  }

  return maxPropValue;
};

export const ISOStringToDate = (ISOString: string): string => {
  return new Date(ISOString).toLocaleString();
};
