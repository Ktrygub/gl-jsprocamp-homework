import Character from './classes/Character';
import Hero from './classes/Hero';
import Monster from './classes/Monster';
import Game from './classes/Game';
import { HEROES_LIST } from './constants';
import { getRandomElement } from './helpers';

/* Game Population mechanism should go below */
const heroHame = getRandomElement(HEROES_LIST);
const heroClass = getRandomElement(Object.keys(Hero.CLASSES));

const hero = new Hero(heroHame, heroClass);

const monsters = [];
for (let i = 0; i < Game.MAX_MONSTERS; i += 1) {
  const monsterClass = getRandomElement(Object.keys(Monster.CLASSES));
  monsters.push(new Monster(monsterClass));
}

const game = new Game(Game.STATUSES.idle, hero, monsters);

game.beginJourney();

let isHeroWon = true;
for (let i = 0; i < Game.MAX_MONSTERS; i += 1) {
  if (game.hero.life > Character.DEATH_THRESHOLD_HP) {
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
