export default class Stack {
   constructor() {
      this.items = []
   }

   push(item) {
      this.items.push(item)
   }

   pop() {
      return this.items.pop()
   }

   size() {
      return this.items.length
   }

   isEmpty() {
      return this.items.length == 0
   }

   print() {
      console.log(this.items)
   }
}