export const prependZeroToSingleDigit = (num) => {
  if (num < 10) {
    return '0' + num
  } else {
    return num
  }
}
