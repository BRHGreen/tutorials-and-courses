function Address (line1, line2, line3, line4, line5) {
  this.line1 = line1;
  this.line2 = line2;
  this.line3 = line3;
  this.line4 = line4;
  this.line5 = line5;
}

var bensAddress = new Address ("E2 Left", "Ashfield rd", "London");
var niksAddress = new Address ("The Old Forge", "Stoke St", "Cheddar");

niksAddress.line4 = "BS27 3UP";

Address.prototype.fullAddress = function (){
  if (this.line4 !== undefined) {
  return this.line1 + "," + "\n" + this.line2 + "," +  "\n" + this.line3 + "\n" + this.line4;
  } else {
  return this.line1 + "," + "\n" + this.line2 + "," + "\n" + this.line3;
  }
};

console.log(bensAddress.fullAddress());
console.log(niksAddress.fullAddress());

console.log('------------------');
