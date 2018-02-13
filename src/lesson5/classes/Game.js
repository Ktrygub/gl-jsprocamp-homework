import Hero from './Hero';
import Monster from './Monster';
import Character from './Character';

const Game = function Game(status = Game.STATUSES.idle, hero, monsters = []) {
  this.status = status;
  this.hero = hero;
  this.monsters = monsters;
};

Game.MAX_MONSTERS = 2;
Game.STATUSES = {
  idle: 'Idle',
  progress: 'In progress',
  finished: 'Finished',
};

Game.prototype = {
  beginJourney() {
    if (this.hero && this.monsters.length === Game.MAX_MONSTERS) {
      this.status = 'In progress';
      return 'Your journey has started, fight monsters';
    }
    throw new Error('Cannot start journey, populate the world with hero and monsters first');
  },

  finishJourney() {
    if (this.hero.life <= Character.DEATH_THRESHOLD_HP) {
      this.status = Game.STATUSES.finished;
      return 'The Game is finished. Hero is dead :(';
    }
    if (this.monsters.some(monster => monster.life > Character.DEATH_THRESHOLD_HP)) {
      return 'Don`t stop. Some monsters are still alive. Kill`em all';
    }
    this.status = Game.STATUSES.finished;
    return 'The Game is finished. Monsters are dead. Congratulations';
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
    if (this.monsters.length === Game.MAX_MONSTERS) {
      throw new Error(`Only ${Game.MAX_MONSTERS} monsters can exist`);
    }
    if (monster instanceof Monster) {
      this.monsters.push(monster);
      return `Monster Created, ${monster.getCharClass()} appeared in the world`;
    }
    throw new Error('Only monster Instances can become monsters');
  },
  fight() {
    if (this.status !== Game.STATUSES.progress) {
      throw new Error('Begin your journey to start fighting monsters');
    }

    const { hero, monsters } = this;

    const monster = monsters.find(monster => monster.life > Character.DEATH_THRESHOLD_HP);

    if (!monster) {
      throw new Error('No alive monsters found. Time to finish your journey.');
    }

    while (hero.life > Character.DEATH_THRESHOLD_HP) {
      hero.attack(monster);
      if (monster.life === Character.DEATH_THRESHOLD_HP) {
        return 'Hero win';
      }
      monster.attack(hero);
    }
    return 'Monster win';
  },
};

export default Game;
