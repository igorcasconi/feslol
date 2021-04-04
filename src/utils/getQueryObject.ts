export const getQueryStringsObject = (qStrings: string, returnObject: any) => {
  if (qStrings) {
    const query = qStrings.substring(1)
    const vars = query.split('&')
    return vars.reduce((acc, cur) => {
      const [key, val] = cur.split('=')
      //If we have an array of item in query string, we may test their type and push to a new array
      if (returnObject[key] && Array.isArray(returnObject[key])) {
        return { ...acc, [key]: [...acc[key], decodeURI(val)] }
      }

      return { ...acc, [key]: decodeURI(val) }
    }, returnObject)
  }
  return returnObject
}
