class Smeltery {
    constructor(characterId, smelteryId) {
      this.characterId = characterId;
      this.smelteryId = smelteryId;
    }
  
    async smeltMineral(mineralType, quantity) {
      try {
        const [smeltery, furnace, backpack, tools] = await Promise.all([
          SmelteryModel.findById(this.smelteryId),
          FurnaceModel.findOne({ smeltery: this.smelteryId }),
          BackpackModel.findOne({ owner: this.characterId }),
          ToolsModel.find({ owner: this.characterId }),
        ]);
  
        if (!smeltery || !furnace) {
          throw new Error('Huta lub piec nie znaleziony.');
        }
  
        if (!furnace.isLit || furnace.temperature < furnace.maxTemperature) {
          throw new Error('Piec nie jest gotowy do wytapiania.');
        }
  
        // Sprawdzenie, czy postać posiada tygiel i szczypce
        const hasCrucible = tools.some(tool => tool.type === 'crucible');
        const hasTongs = tools.some(tool => tool.type === 'tongs');
  
        if (!hasCrucible || !hasTongs) {
          throw new Error('Brak wymaganych narzędzi (tygiel, szczypce).');
        }
  
        // Sprawdzenie, czy gracz ma wystarczającą ilość minerałów w plecaku
        const mineral = backpack.items.find(item => item.resource === mineralType);
  
        if (!mineral || mineral.quantity < quantity) {
          throw new Error('Niewystarczająca ilość minerałów.');
        }
  
        // Zużycie minerałów
        mineral.quantity -= quantity;
        await backpack.save();
  
        // Tworzenie sztabki (możesz dodać logikę zapisywania sztabki w plecaku lub innym magazynie)
        // Przykład:
        const ingot = new ResourceModel({ name: `${mineralType} Ingot`, type: 'ingot', quantity });
        backpack.items.push(ingot);
        await backpack.save();
  
        return { success: true, message: `Udało się wytopić ${quantity} sztabek ${mineralType}.` };
      } catch (error) {
        console.error('Błąd podczas wytapiania minerału:', error);
        return { success: false, message: error.message };
      }
    }
  }
  