import { heroClasses } from '../constants';
import Character from './Character';
import Monster from './Monster';

const Hero = function Hero(name, charClass) {
  Character.call(this, heroClasses, charClass);
  this.name = name;
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

export default Hero;
