export const findMostCommonPropertyValue = <
  T extends Record<K, V>,
  K extends keyof T,
  V extends string | number
>(
  arr: T[],
  prop: K
): V | null => {
  const counts: Record<V, number> = {};
  let maxCount = 0;
  let maxPropValue: V | null = null;

  for (const obj of arr) {
    const propValue = obj[prop];

    if (propValue in counts) {
      counts[propValue]++;
    } else {
      counts[propValue] = 1;
    }
  }

  for (const propValue in counts) {
    if (counts[propValue] > maxCount) {
      maxCount = counts[propValue];
      maxPropValue = propValue as V;
    }
  }

  return maxPropValue;
};

export const ISOStringToDate = (ISOString: string): string => {
  return new Date(ISOString).toLocaleString();
};
