const Character = function Character(charType, charClass) {
  if (Object.prototype.hasOwnProperty.call(charType, charClass)) {
    Object.assign(this, charType[charClass]);
  } else {
    throw new Error('Incorrect character class provided');
  }
};

Character.DEATH_THRESHOLD_HP = 0;

Character.prototype = {
  getName() {
    return this.name;
  },
  getCharClass() {
    return this.charClass;
  },
  attack(target) {
    if (target instanceof Character) {
      target.life = Math.max(target.life - this.damage, Character.DEATH_THRESHOLD_HP);
    } else {
      throw new Error('Inalid target. Only Character object could be a target.');
    }
    return target.life > Character.DEATH_THRESHOLD_HP
      ? `done ${this.damage} damage to ${target.getCharClass()}`
      : `${target.getCharClass()} killed`;
  },
};

export default Character;
