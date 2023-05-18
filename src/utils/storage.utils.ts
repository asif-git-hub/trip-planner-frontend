const cacheKey = "enchantrekUseCount"

export function updateUseCountInLocalStorage(newCount: number): number {
  const useCount = localStorage.getItem(cacheKey)
  console.log("updateUseCountInLocalStorage", useCount)

  localStorage.setItem(cacheKey, `${newCount}`)

  return parseInt(localStorage.getItem(cacheKey) as string)
}

export function getUseCountFromLocalStorage(): number {
  const useCount = localStorage.getItem(cacheKey)
  console.log("getUseCountFromLocalStorage", useCount)
  if (useCount && parseInt(useCount)) {
    return parseInt(useCount)
  } else {
    console.log("Setting to zero")
    //   localStorage.setItem(cacheKey, "0")
    return parseInt(localStorage.getItem(cacheKey) as string)
  }
}
