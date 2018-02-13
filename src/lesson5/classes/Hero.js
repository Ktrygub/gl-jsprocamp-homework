import Character from './Character';
import Monster from './Monster';

const Hero = function Hero(name, charClass) {
  Character.call(this, Hero.CLASSES, charClass);
  this.name = name;
};

Hero.CLASSES = {
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

Hero.prototype = {
  attack(target) {
    if (target instanceof Monster) {
      return `Hero attacked, ${super.attack(target)}`;
    }
    return 'I will attack only monsters';
  },
};

Object.setPrototypeOf(Hero.prototype, Character.prototype);

export default Hero;
