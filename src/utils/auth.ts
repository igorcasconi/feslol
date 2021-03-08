export const getToken = () => localStorage.getItem('_@token')

export const setToken = (token: string) => localStorage.setItem('_@token', token)

export const clearToken = () => localStorage.removeItem('_@token')
