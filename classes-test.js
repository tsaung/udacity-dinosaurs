function Creature(name, weight) {
  this.name = name;
  this.weight = weight;
}

function Dino(name, weight, what) {
  Creature.call(this, name, weight);
  this.what = what;
}

const dino = new Dino();

console.log(dino.hasOwnProperty('name'));
dino