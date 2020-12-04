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

  const tileColors = [
    '009687f5',
    'dc7657f5',
    '4bb3c1fa',
    'fac069f9',
    '67a866f9',
    'b94169fa',
    '7f62b3fa',
    '9fc376f9',
    '677bcbfa',
  ];
  // base class
  class Creature {
    /**
     *
     * @param {{weight: string, diet: string}} info
     */
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

  // cached the DOMs to improve performance
  const DOMCache = {
    form: document.getElementById('dino-compare'),
    grid: document.getElementById('grid'),
    inputs: {
      name: document.getElementById('name'),
      feet: document.getElementById('feet'),
      inches: document.getElementById('inches'),
      weight: document.getElementById('weight'),
      diet: document.getElementById('diet'),
    },
    submit: document.getElementById('btn'),
    restart: document.getElementById('restart'),
  };

  DOMCache.restart.addEventListener('click', toggleView);

  // Create Human Object
  // Use IIFE to get human data from form
  const humanData = (function (submit) {
    submit.addEventListener('click', function () {
      validateFormData(getHumanData());
    });

    function getHumanData() {
      const inputs = DOMCache.inputs;
      const humanData = {};
      Object.keys(inputs).forEach((key) => {
        humanData[key] = inputs[key].value;
      });
      return humanData;
    }

    return getHumanData();
  })(DOMCache.submit);

  const human = new Human(humanData);

  // basic form validation
  function validateFormData(data) {
    Object.assign(human, data);
    const inputs = DOMCache.inputs;
    let errors = 0;

    const nameInvalid = !human.name && ++errors;
    showError(inputs.name, nameInvalid);

    const feetInvalid =
      (!human.feet || human.feet > 8 || human.height > 90) && ++errors;
    showError(inputs.feet, feetInvalid);

    const inchesInvalid =
      (!human.inches || human.inches > 11 || human.height > 90) && ++errors;
    showError(inputs.inches, inchesInvalid);

    const weightInvalid = (human.weight < 50 || human.weight > 350) && ++errors;
    showError(inputs.weight, weightInvalid);

    if (!errors) {
      addTilesTo(DOMCache.grid);
    }
  }

  /**
   * @param {HTMLInputElement} dom
   */
  function showError(dom, hasErr) {
    if (hasErr) {
      dom.classList.add('error');
    } else {
      dom.classList.remove('error');
    }
  }

  /**
   * @param {Human} human
   * @returns {string}
   */
  Dino.prototype.compareWeight = function (human) {
    const ratio = this.weight / human.weight;
    if (ratio < 1) {
      return `This species of dinosaur were small.It is even smaller than ${human.name}`;
    }
    return `${Math.round(ratio)}x times bigger than ${human.name}`;
  };

  /**
   * @param {Human} human
   * @returns {string}
   */
  Dino.prototype.compareHeight = function (human) {
    if (this.height < human.height) {
      return `This dinosaur is even shorter than ${human.name}. Maybe a Pokemon`;
    }
    return `This dinosaur is ${this.height - human.height}ft taller than ${
      human.name
    }`;
  };

  /**
   * @param {Human} human
   * @returns {string}
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
   * @returns {string[]}
   */
  Dino.prototype.getInfos = function (human) {
    return [
      this.where,
      this.when,
      this.fact,
      this.compareDiet(human),
      this.compareHeight(human),
      this.compareWeight(human),
    ];
  };

  /**
   * @param {Human} human
   * @returns {string}
   */
  Dino.prototype.getRandomInfo = function (human) {
    if (this.species.toLowerCase() === 'pigeon') {
      return this.fact;
    }

    const possibleValues = this.getInfos(human);

    return possibleValues[Math.floor(Math.random() * possibleValues.length)];
  };

  /**
   * @param {string} title
   * @param {string} imageUrl
   * @param {string} fact
   * @returns {HTMLElement}
   */
  function createTile(title, imageUrl, fact) {
    const tile = document.createElement('div');
    tile.classList.add('grid-item');

    const header = document.createElement('h3');
    header.innerHTML = title;

    const img = document.createElement('img');
    img.src = imageUrl;

    tile.appendChild(header);
    tile.appendChild(img);

    if (fact) {
      const p = document.createElement('p');
      p.innerHTML = fact;
      tile.append(p);
    }

    return tile;
  }

  function addTilesTo(grid) {
    toggleView();

    shuffle(tileColors);

    const tiles = dinoList.map((d, i) => {
      const tile = createTile(
        d.species,
        `images/${d.species.toLowerCase()}.png`,
        d.getRandomInfo(human)
      );
      tile.style.backgroundColor = '#' + tileColors[i];
      return tile;
    });

    const humanTile = createTile(human.name, 'images/human.png', '');
    humanTile.style.backgroundColor = '#' + tileColors[tileColors.length - 1];

    shuffle(tiles);

    tiles.splice(4, 0, humanTile);

    tiles.forEach((tile) => grid.appendChild(tile));
  }

  function toggleView() {
    const isFormView = !DOMCache.form.classList.contains('hide');
    const { form, restart, grid } = DOMCache;
    if (isFormView) {
      form.classList.add('hide');
      restart.classList.remove('hide');
    } else {
      grid.innerHTML = '';
      form.classList.remove('hide');
      restart.classList.add('hide');
    }
  }
  /**
   * @param {Array} array
   */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // export constructors and data objects
  Object.assign(app, {
    Creature: Creature,
    Dino: Dino,
    Human: Human,
    human: human,
    dinoList: dinoList,
  });
})((window.DinoApp = window.DinoApp || {}));
