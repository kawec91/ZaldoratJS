import Race from "../class/race.js";
import RaceModel from "../models/race.model.js";

// Domyślne wartości atrybutów
const defaultAttributes = {
  strength: 1.0,
  agility: 1.0,
  vitality: 1.0,
  intelligence: 1.0,
};

// Domyślne wartości mnożników doświadczenia
const defaultXpMultipliers = {
  stats: {
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
  },
  craftingAbilities: {
    smithing: 1.0,
    smelting: 1.0,
    tailoring: 1.0,
    taming: 1.0,
    animal_husbandry: 1.0,
    carpenter: 1.0,
    mining: 1.0,
    alchemy: 1.0,
    healing_herbalism: 1.0,
    runemaking: 1.0,
    jewelry: 1.0,
    woodcutting: 1.0,
    cooking: 1.0,
    trading: 1.0,
    farming: 1.0,
  },
  fightingAbilities: {
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
  },
};

// Funkcja do tworzenia nowej rasy
export const createRace = async (req, res) => {
  try {
    const raceData = req.body;
    console.log("Received Race Data:", JSON.stringify(raceData, null, 2)); // Logowanie danych wejściowych

    // Łączymy dane wejściowe z domyślnymi wartościami
    const combinedData = {
      name: raceData.name,
      description: raceData.description,
      attributes: {
        ...defaultAttributes,
        ...raceData.attributes, // nadpisujemy domyślne atrybuty tymi z żądania
      },
      xpMultipliers: {
        stats: {
          ...defaultXpMultipliers.stats,
          ...raceData.xpMultipliers?.stats // nadpisujemy domyślne mnożniki statystyk
        },
        craftingAbilities: {
          ...defaultXpMultipliers.craftingAbilities,
          ...raceData.xpMultipliers?.craftingAbilities // nadpisujemy domyślne mnożniki umiejętności rzemieślniczych
        },
        fightingAbilities: {
          ...defaultXpMultipliers.fightingAbilities,
          ...raceData.xpMultipliers?.fightingAbilities // nadpisujemy domyślne mnożniki umiejętności walki
        },
      },
    };

    console.log("Combined Data Before Saving:", JSON.stringify(combinedData, null, 2)); // Logowanie połączenia

    const race = new Race(combinedData); // Inicjalizacja instancji Race z połączonymi danymi
    const raceDBObject = race.toDBObject(); // Konwersja do formatu MongoDB

    console.log("Race DB Object:", JSON.stringify(raceDBObject, null, 2)); // Logowanie przed zapisem

    const newRace = new RaceModel(raceDBObject);
    const savedRace = await newRace.save(); // Zapisanie nowej rasy w bazie danych

    res.status(201).json(savedRace); // Zwrócenie zapisanej rasy w odpowiedzi
  } catch (error) {
    console.error("Error creating race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Funkcja do pobierania rasy na podstawie ID
export const getRace = async (req, res) => {
  try {
    const { id } = req.params;

    const race = await RaceModel.findById(id); // Znalezienie rasy w bazie danych na podstawie ID

    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.status(200).json(race); // Zwrócenie znalezionej rasy
  } catch (error) {
    console.error("Error fetching race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Funkcja do usuwania rasy na podstawie ID
export const deleteRace = async (req, res) => {
  try {
    const { id } = req.params;
    const race = await RaceModel.findByIdAndDelete(id); // Usunięcie rasy z bazy danych

    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.status(200).json({ message: "Race deleted successfully" });
  } catch (error) {
    console.error("Error deleting race:", error);
    res.status(500).json({ error: "Error deleting race" });
  }
};

// Funkcja do pobierania wszystkich ras
export const getAllRaces = async (req, res) => {
  try {
    const races = await RaceModel.find(); // Znalezienie wszystkich ras w bazie danych
    res.status(200).json(races); // Zwrócenie wszystkich ras
  } catch (error) {
    console.error("Error in getAllRaces controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Funkcja do aktualizacji konkretnych pól rasy na podstawie ID
export const updateRace = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const race = await RaceModel.findByIdAndUpdate(
      id,
      { $set: updateData }, // Aktualizacja podanych danych
      { new: true, runValidators: true } // Zwrócenie zaktualizowanego dokumentu, z walidacją
    );

    if (!race) {
      return res.status(404).json({ error: "Race not found" });
    }

    res.status(200).json(race); // Zwrócenie zaktualizowanej rasy
  } catch (error) {
    console.error("Error updating race:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
