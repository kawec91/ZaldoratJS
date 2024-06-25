class Race {
    constructor({ name, description, attributes }) {
      this.name = name;
      this.description = description;
      this.attributes = attributes;
    }
  
    toDBObject() {
      return {
        name: this.name,
        description: this.description,
        attributes: this.attributes,
      };
    }
  }
  
  export default Race;
  