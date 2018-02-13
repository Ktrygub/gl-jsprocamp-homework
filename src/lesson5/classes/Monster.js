import Character from './Character';
import Hero from './Hero';

const Monster = function Monster(charClass) {
  Character.call(this, Monster.CLASSES, charClass);
};

Monster.CLASSES = {
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

export default Monster;
