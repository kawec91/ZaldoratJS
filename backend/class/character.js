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
    statsXpMultiplier = {},
    craftingAbilities = {},
    craftingAbilitiesXpMultiplier = {},
    fightingAbilities = {},
    fightingAbilitiesXpMultiplier = {},
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

    this.statsXpMultiplier = {
      power: 1.0,
      defence: 1.0,
      speed: 1.0,
      agility: 1.0,
      vitality: 1.0,
      blood: 1.0,
      hp: 1.0,
      max_hp: 1.0,
      critical: 1.0,
      luck: 1.0,
      ...statsXpMultiplier,
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

    this.craftingAbilitiesXpMultiplier = {
      smithing: 1.0,
      smelting: 1.0,
      tailoring: 1.0,
      taming: 1.0,
      animalHusbandry: 1.0,
      carpenter: 1.0,
      mining: 1.0,
      alchemy: 1.0,
      healingHerbalism: 1.0,
      runemaking: 1.0,
      jewlery: 1.0,
      woodcutting: 1.0,
      cooking: 1.0,
      trading: 1.0,
      farming: 1.0,
      ...craftingAbilitiesXpMultiplier,
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
      lightarmor: 3,
      mediumarmor: 3,
      heavyarmor: 3,
      stealing: 3,
      vampire: 3,
      necromancy: 3,
      ...fightingAbilities,
    };

    this.fightingAbilitiesXpMultiplier = {
      dodge: 1.0,
      swords: 1.0,
      axes: 1.0,
      maces: 1.0,
      polearms: 1.0,
      bows: 1.0,
      magic: 1.0,
      shielding: 1.0,
      lightarmor: 1.0,
      mediumarmor: 1.0,
      heavyarmor: 1.0,
      stealing: 1.0,
      vampire: 1.0,
      necromancy: 1.0,
      ...fightingAbilitiesXpMultiplier,
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
      stats_xp_multiplier: this.statsXpMultiplier,
      crafting_abilities: this.craftingAbilities,
      crafting_abilities_xp_multiplier: this.craftingAbilitiesXpMultiplier,
      fighting_abilities: this.fightingAbilities,
      fighting_abilities_xp_multiplier: this.fightingAbilitiesXpMultiplier,
      world: this.world,
      deityRank: this.deityRank,
      lastSeen: this.lastSeen,
      location: this.location,
      weight: this.weight, 
    };
  }
}

export default Character;
