const cacheKey = "enchantrekUseCount"

export function updateUseCountInLocalStorage(newCount: number): number {

  localStorage.setItem(cacheKey, `${newCount}`)

  return parseInt(localStorage.getItem(cacheKey) as string)
}

export function getUseCountFromLocalStorage(): number {
  const useCount = localStorage.getItem(cacheKey)
  if (useCount && parseInt(useCount)) {
    return parseInt(useCount)
  } else {
    //   localStorage.setItem(cacheKey, "0")
    return parseInt(localStorage.getItem(cacheKey) as string)
  }
}
