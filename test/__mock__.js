export default class Data {
  constructor() {
    this.data = [];
  }

  setData(n) {
    if (!n) this.data = null;
    else this.data = new Array(n).fill(1);
  }

  getData() {
    return this.data;
  }
}
