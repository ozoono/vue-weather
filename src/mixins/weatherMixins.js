export const weatherMixins = {
  filters: {
    tempScale(value, scale) {
      return (scale == 'C') ? value : Number(((value * 9/5) + 32).toFixed(1))
    }
  }
}