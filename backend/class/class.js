class CharacterClass {
  constructor({ name, description, xpMultipliers }) {
      this.name = name;
      this.description = description;
      this.xpMultipliers = xpMultipliers; // Mnożniki doświadczenia
  }

  toDBObject() {
      return {
          name: this.name,
          description: this.description,
          xpMultipliers: this.xpMultipliers, // Dodanie mnożników do obiektu
      };
  }
}

export default CharacterClass;
