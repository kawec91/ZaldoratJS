import React from 'react';

export default function StartVillagePage() {
  return (
    <div className="village-container">
      <h1>Start Village</h1>

      {/* Opis wioski */}
      <p>Witamy w małej wiosce startowej, pełnej przygód i nowych możliwości!</p>

      {/* Sklep */}
      <div className="village-shop">
        <h2>Sklep</h2>
        <p>W sklepie znajdziesz podstawowe przedmioty potrzebne do podróży.</p>
        <button>Kup przedmioty</button>
      </div>

      {/* Stajnia */}
      <div className="village-stable">
        <h2>Stajnia</h2>
        <p>W stajni możesz kupić konia lub wynająć transport.</p>
        <button>Odwiedź stajnię</button>
      </div>

      {/* Aktywność: Zbieranie drewna */}
      <div className="village-activity">
        <h2>Zbieranie drewna</h2>
        <p>Wybierz się do lasu i zbierz drewno na opał lub budowę.</p>
        <button>Zbieraj drewno</button>
      </div>

      {/* Aktywność: Zbieranie ziół */}
      <div className="village-herb-gathering">
        <h2>Zbieranie ziół</h2>
        <p>Poszukaj rzadkich ziół, które mogą pomóc w leczeniu lub alchemii.</p>
        <button>Zbieraj zioła</button>
      </div>
    </div>
  );
}
