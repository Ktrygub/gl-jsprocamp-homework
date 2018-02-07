import { statuses, DEATH_THRESHOLD_HP, MAX_MONSTERS } from '../constants';
import Hero from './Hero';
import Monster from './Monster';

const Game = function Game(status = statuses.idle, hero, monsters = []) {
  this.status = status;
  this.hero = hero;
  this.monsters = monsters;
};

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

export default Game;
