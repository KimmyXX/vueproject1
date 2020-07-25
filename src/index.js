import '../style/test.css';
import '../style/testscss.scss';
class testClass {
  constructor() {
    this.consolex = function() {
      console.log("x");
    }
  }
}
let x = new testClass();
x.consolex();

let div = document.createElement('div');
document.querySelector('body').appendChild(div);
