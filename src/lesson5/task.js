import Hero from './classes/Hero';
import Monster from './classes/Monster';
import Game from './classes/Game';
import {
  MAX_MONSTERS,
  DEATH_THRESHOLD_HP,
  monsterClasses,
  heroClasses,
  heroesList,
  statuses,
} from './constants';
import { getRandomElement } from './helpers';

/* Game Population mechanism should go below */

const hero = new Hero(getRandomElement(heroesList), getRandomElement(Object.keys(heroClasses)));

const monsters = [];
for (let i = 0; i < MAX_MONSTERS; i += 1) {
  monsters.push(new Monster(getRandomElement(Object.keys(monsterClasses))));
}

const game = new Game(statuses.idle, hero, monsters);

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
