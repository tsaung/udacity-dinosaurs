(function (app) {
  const data = [
    {
      species: 'Triceratops',
      weight: 13000,
      height: 114,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'First discovered in 1889 by Othniel Charles Marsh',
    },
    {
      species: 'Tyrannosaurus Rex',
      weight: 11905,
      height: 144,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'The largest known skull measures in at 5 feet long.',
    },
    {
      species: 'Anklyosaurus',
      weight: 10500,
      height: 55,
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Anklyosaurus survived for approximately 135 million years.',
    },
    {
      species: 'Brachiosaurus',
      weight: 70000,
      height: '372',
      diet: 'herbavor',
      where: 'North America',
      when: 'Late Jurasic',
      fact: 'An asteroid was named 9954 Brachiosaurus in 1991.',
    },
    {
      species: 'Stegosaurus',
      weight: 11600,
      height: 79,
      diet: 'herbavor',
      where: 'North America, Europe, Asia',
      when: 'Late Jurasic to Early Cretaceous',
      fact:
        'The Stegosaurus had between 17 and 22 seperate places and flat spines.',
    },
    {
      species: 'Elasmosaurus',
      weight: 16000,
      height: 59,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Elasmosaurus was a marine reptile first discovered in Kansas.',
    },
    {
      species: 'Pteranodon',
      weight: 44,
      height: 20,
      diet: 'carnivor',
      where: 'North America',
      when: 'Late Cretaceous',
      fact: 'Actually a flying reptile, the Pteranodon is not a dinosaur.',
    },
    {
      species: 'Pigeon',
      weight: 0.5,
      height: 9,
      diet: 'herbavor',
      where: 'World Wide',
      when: 'Holocene',
      fact: 'All birds are living dinosaurs.',
    },
  ];

  // base class
  class Creature {
    constructor(info) {
      this.weight = info.weight;
      this.diet = info.diet;
    }
  }

  // Create Dino Objects
  class Dino extends Creature {
    constructor(info) {
      super(info);
      this.height = info.height;
      this.species = info.species;
      this.where = info.where;
      this.when = info.when;
      this.fact = info.fact;
    }
  }

  // Create Dino Objects
  const dinoList = data.map((info) => new Dino(info));

  // Human Constructor
  class Human extends Creature {
    constructor(info) {
      super(info);
      this.name = info.name;
      this.feet = info.feet;
      this.inches = info.inches;
    }

    get height() {
      return this.feet * 12 + +this.inches;
    }
  }

  console.log(dinoList);

  // Create Human Object
  const human = new Human({});
  console.log(human);

  // Use IIFE to get human data from form
  ((human) => {
    // cached the DOMs to imporve performance
    const domsCache = Object.keys(human).map((id) =>
      document.getElementById(id)
    );

    document.getElementById('btn').addEventListener('click', () => {
      let errCount = 0;
      const formInputData = {};
      domsCache.forEach((domElem) => {
        if (!domElem.value) {
          errCount++;
          domElem.classList.add('error');
        } else {
          domElem.classList.remove('error');
          formInputData[domElem.id] = domElem.value;
        }
      });

      if (!errCount) {
        Object.assign(human, formInputData);
      }
    });
  })(human);

  /**
   * @param {Human} human
   * @returns {String}
   */
  Dino.prototype.compareWeight = function (human) {
    const ratio = this.weight / human.weight;

    if (ratio < 1) {
      // Poor dinosaur, why you are so small? It must be Pteranodon or Pigeon. Dear user/reviewer, pls don't input the weight of NodeJS modules folder..
      // This program was never intended to calculate the weight of blackhole, NodeJS modules, etc...";
      return `This species of dinosaur were small.It is even smaller than ${human.weight}`;
    }
    return `${Math.round(ratio)}x bigger than ${human.name}`;
  };

  /**
   * @param {Human} human
   * @returns {String}
   */
  Dino.prototype.compareHeight = function (human) {
    if (this.height < human.height) {
      return `This dinosaur is even shorter than ${human.name}. Maybe a Pokemon`;
    }
    return `This dinosaur is ${this.height - human.height} taller than ${
      human.name
    }`;
  };

  /**
   * @param {Human} human
   * @returns {String}
   */
  Dino.prototype.compareDiet = function (human) {
    if (this.diet.toLowerCase() === human.diet.toLowerCase()) {
      return `This dinosaur and ${human.name} have same diet plan. They should date at good restaurant`;
    } else {
      return `This dinosaur and ${human.name} have different taste`;
    }
  };

  /**
   * @param {Human} human
   * @returns {String}
   */
  Dino.prototype.getRandomInfo = function (human) {
    if (this.species.toLowerCase() === 'pigeon') {
      return this.fact;
    }

    
  };

  function generateTiles() {}

  app.dinos = dinoList;
})((window.app = window.app || {}));
