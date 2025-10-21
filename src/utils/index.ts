type RemplaceKeys<T, K extends keyof T, V> = Omit<T, K> & { [P in K]: V }

export function formatBigInt<T extends object, K extends keyof T>(
  data: T,
): RemplaceKeys<T, K, number> {
  const result = { ...data } as RemplaceKeys<T, K, number>

  for (const key of Object.keys(data)) {
    if (typeof data[key] === 'bigint') {
      result[key] = +data[key].toString()
    }
  }

  return result
}
