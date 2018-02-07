import { monsterClasses } from '../constants';
import Character from './Character';
import Hero from './Hero';

const Monster = function Monster(charClass) {
  Character.call(this, monsterClasses, charClass);
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
// now Monster.prototype.__proto__ === Character.prototype

export default Monster;
