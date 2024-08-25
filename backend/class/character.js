// class/character.js
class Character {
  constructor({
    owner,
    nickname,
    characterName,
    race,
    classType,
    ancestry,
    level = 1,
    stats = {},
    craftingAbilities = {},
    fightingAbilities = {},
    world,
    deityRank,
    lastSeen,
    location,
    weight = 80,
  }) {
    this.owner = owner;
    this.nickname = nickname;
    this.characterName = characterName;
    this.race = race;
    this.classType = classType;
    this.ancestry = ancestry;
    this.level = level;
    this.stats = {
      power: 3,
      defence: 3,
      speed: 3,
      agility: 3,
      vitality: 3,
      blood: 3,
      hp: 3,
      max_hp: 3,
      critical: 3,
      luck: 3,
      ...stats,
    };
    this.craftingAbilities = {
      smithing: 3,
      smelting: 3,
      tailoring: 3,
      taming: 3,
      animalHusbandry: 3,
      carpenter: 3,
      mining: 3,
      alchemy: 3,
      healingHerbalism: 3,
      runemaking: 3,
      jewlery: 3,
      woodcutting: 3,
      cooking: 3,
      trading: 3,
      farming: 3,
      ...craftingAbilities,
    };
    this.fightingAbilities = {
      dodge: 3,
      swords: 3,
      axes: 3,
      maces: 3,
      polearms: 3,
      bows: 3,
      magic: 3,
      shielding: 3,
      stealing: 3,
      vampire: 3,
      necromancy: 3,
      ...fightingAbilities,
    };
    this.world = world;
    this.deityRank = deityRank;
    this.lastSeen = lastSeen;
    this.location = location;
    this.weight = weight; 
  }

  // Metoda do konwersji instancji klasy na obiekt gotowy do zapisu w bazie danych
  toDBObject() {
    return {
      owner: this.owner,
      nickname: this.nickname,
      character_name: this.characterName,
      race: this.race,
      class: this.classType,
      ancestry: this.ancestry,
      level: this.level,
      stats: this.stats,
      crafting_abilities: this.craftingAbilities,
      fighting_abilities: this.fightingAbilities,
      world: this.world,
      deityRank: this.deityRank,
      lastSeen: this.lastSeen,
      location: this.location,
      weight: this.weight, 
    };
  }
}

export default Character;
