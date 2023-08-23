export const formatDate = (date: string | undefined = ''): string => {
  return !date ? new Date().toLocaleString() : new Date(date).toLocaleString()
}
