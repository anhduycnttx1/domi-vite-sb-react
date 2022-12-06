export const calcSpanCol = (colString: string, index: number) => {
  const arr = colString.split('-')
  const count = arr.reduce(
    (accumulator: number, currentValue: string) => accumulator + Number(currentValue),
    0
  )
  return (12 / count) * Number(arr[index])
}
