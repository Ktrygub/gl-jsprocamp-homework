// helper. May be useful when need to select random monster, if you need it
/* eslint-disable no-mixed-operators */
function getRandomInt(frm, to) {
  const min = Math.ceil(Math.min(frm, to));
  const max = Math.floor(Math.max(frm, to));

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}
/* eslint-enable no-mixed-operators */

// ---------------------------------------------------------------------------------------------------------
const heroClasses = {
  warrior: {
    charClass: 'Warrior',
    life: 30,
    damage: 4,
  },
  rogue: {
    charClass: 'Rogue',
    life: 25,
    damage: 3,
  },
  sorcerer: {
    charClass: 'Sorcerer',
    life: 20,
    damage: 5,
  },
};
const monsterClasses = {
  zombie: {
    charClass: 'Zombie',
    life: 8,
    damage: 4,
  },
  skeleton: {
    charClass: 'Skeleton',
    life: 10,
    damage: 6,
  },
  holem: {
    charClass: 'Holem',
    life: 15,
    damage: 6,
  },
};
const statuses = {
  idle: 'Idle',
  progress: 'In progress',
  finished: 'Finished',
};
const MAX_MONSTERS = 2;
const DEATH_THRESHOLD_HP = 0;
// ----------------------------------------------------------------------------------------------------------

const Game = function Game(status = statuses.idle, hero, monsters = []) {
  this.status = status;
  this.hero = hero;
  this.monsters = monsters;
};

const Character = function Character(charType, charClass) {
  if (Object.prototype.hasOwnProperty.call(charType, charClass)) {
    Object.assign(this, charType[charClass]);
  } else {
    throw new Error('Incorrect character class provided');
  }
};

const Hero = function Hero(name, charClass) {
  Character.call(this, heroClasses, charClass);
  this.name = name;
};

const Monster = function Monster(charClass) {
  Character.call(this, monsterClasses, charClass);
};

Character.prototype = {
  getCharClass() {
    return this.charClass;
  },
  attack(target) {
    if (target instanceof Character) {
      target.life = Math.max(target.life - this.damage, DEATH_THRESHOLD_HP);
    } else {
      throw new Error('Inalid target. Only Character object could be a target.');
    }
    return target.life > DEATH_THRESHOLD_HP
      ? `done ${this.damage} damage to ${target.getCharClass()}`
      : `${target.getCharClass()} killed`;
  },
};

Hero.prototype = {
  getName() {
    return this.name;
  },
  attack(target) {
    if (target instanceof Monster) {
      return `Hero attacked, ${super.attack(target)}`;
    }
    return 'I will attack only monsters';
  },
};

Object.setPrototypeOf(Hero.prototype, Character.prototype);
// now Hero.prototype.__proto__ === Character.prototype

Monster.prototype = {
  getName() {
    return `I am ${this.getCharClass()} I don\`t have name`;
  },
  attack(target) {
    if (target instanceof Hero) {
      return `Monster attacked, ${super.attack(target)}`;
    }
    return 'I will attack only Hero';
  },
};

Object.setPrototypeOf(Monster.prototype, Character.prototype);
// now Monster.prototype.__proto__ === Character.prototype

Game.prototype = {
  beginJourney() {
    if (this.hero && this.monsters.length === MAX_MONSTERS) {
      this.status = 'In progress';
      return 'Your journey has started, fight monsters';
    }
    throw new Error('Cannot start journey, populate the world with hero and monsters first');
  },

  finishJourney() {
    if (this.hero.life <= DEATH_THRESHOLD_HP) {
      this.status = statuses.finished;
      return 'The Game is finished. Hero is dead :(';
    }
    if (
      this.monsters.reduce(
        (countOfAliveMonsters, monster) =>
          (monster.life > DEATH_THRESHOLD_HP ? countOfAliveMonsters + 1 : countOfAliveMonsters),
        0
      ) === 0
    ) {
      this.status = statuses.finished;
      return 'The Game is finished. Monsters are dead. Congratulations';
    }
    return 'Don`t stop. Some monsters are still alive. Kill`em all';
  },

  addHero(hero) {
    if (this.hero) {
      throw new Error('Only one hero can exist');
    }
    if (hero instanceof Hero) {
      this.hero = hero;
      return `Hero created, welcome ${hero.getName()}`;
    }
    throw new Error('Only hero instance can be hero');
  },

  addMonster(monster) {
    if (this.monsters.length === MAX_MONSTERS) {
      throw new Error(`Only ${MAX_MONSTERS} monsters can exist`);
    }
    if (monster instanceof Monster) {
      this.monsters.push(monster);
      return `Monster Created, ${monster.getCharClass()} appeared in the world`;
    }
    throw new Error('Only monster Instances can become monsters');
  },
  fight() {
    if (this.status !== statuses.progress) {
      throw new Error('Begin your journey to start fighting monsters');
    }

    const { hero, monsters } = this;

    const monster = monsters.find(monster => monster.life > DEATH_THRESHOLD_HP);

    while (true) {
      hero.attack(monster);
      if (monster.life === DEATH_THRESHOLD_HP) {
        return 'Hero win';
      }
      monster.attack(hero);
      if (hero.life === DEATH_THRESHOLD_HP) {
        return 'Monster win';
      }
    }
  },
};

/* Game Population mechanism should go below */
const heroesList = [
  'Aleksandr Shutilov',
  'Alex Voloshchenko',
  'Andrii Iermakov',
  'Andriy Ilin',
  'Ilya Volk',
  'Ivan Zinchenko',
  'Maxim Karapysh',
  'Maxim Kondzera',
  'Michael Sosin',
  'Natalia Zhidejkina',
  'Oksana Barylo',
  'Oleg Panichev',
  'Petro Prokopovych',
  'Roman Malizderskyi',
  'Rostyslav Rzhenetskyy',
  'Stas Chernenko',
  'Viktor Moyseyenko',
  'Viktor Shevchenko',
  'Vlad Kampov',
  'Konstantin Trygub',
  'Nadiia Beztsinna',
  'Pavel Sprogis',
];

const game = new Game();

const hero = new Hero(getRandomElement(heroesList), getRandomElement(Object.keys(heroClasses)));
game.addHero(hero);

for (let i = 0; i < MAX_MONSTERS; i += 1) {
  const monster = new Monster(getRandomElement(Object.keys(monsterClasses)));
  game.addMonster(monster);
}

game.beginJourney();

let isHeroWon = true;

for (let i = 0; i < MAX_MONSTERS; i += 1) {
  if (game.hero.life > DEATH_THRESHOLD_HP) {
    game.fight();
  } else {
    isHeroWon = false;
    game.finishJourney();
    break;
  }
}

if (isHeroWon) {
  game.finishJourney();
}
/* End of your solution for Game Population mechanism */

export default {
  Game,
  Hero,
  Monster,
};
