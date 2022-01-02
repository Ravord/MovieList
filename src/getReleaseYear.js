export default function getReleaseYear(date, addParenthesis) {
  let splited = date.split('-')[0]
  if (addParenthesis === true) {
    splited = `(${splited})`
  }
  if (!date || date === 'n/a') return ''
  return splited
}
