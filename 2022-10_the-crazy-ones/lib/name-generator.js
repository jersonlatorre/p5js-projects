let chars = '0123456789abcdefghijklmnopqrstuvwxyz@$&ABCDEFGHIJKLMNOPQRSTUVWXYZ'
function generateRandomName(length) {
  let string = ''
  for (let i = 0; i < length; i++) {
    string += chars[parseInt(random() * chars.length)]
  }
  return string
}
