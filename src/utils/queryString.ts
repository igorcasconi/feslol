export const formatSingleQueryString = (name: string, value: unknown) => `${name}=${value}`

export const formatQueryString = (filters: {}) => {
  const queryString = Object.entries(filters).reduce((acc, [key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      if (Array.isArray(val)) {
        if (val.length === 0) return acc
        return val.reduce((valAcc, item) => `${valAcc}${formatSingleQueryString(key, item)}&`, acc)
      }
      return `${acc}${formatSingleQueryString(key, val)}&`
    }
    return acc
  }, '')

  return queryString.slice(0, -1)
}
