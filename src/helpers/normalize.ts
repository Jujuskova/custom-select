export function normalize<T>(
  data: T[],
  key: string,
): Record<string | number, T> {
  const normalizedData = data.reduce(
    (acc: Record<string | number, T>, current: any) => {
      const dataKey: any = current[key]
      return { ...acc, [dataKey as any]: current }
    },
    {},
  )
  return normalizedData
}
