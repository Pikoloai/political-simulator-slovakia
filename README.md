# Slovenský Politický Simulátor 🎮

**Realistická politická simulácia - Správa vlády, parlament, diplomacia, voľby a mediálny systém**

## 🏛️ O hre

Slovenský Politický Simulátor je dynamická politická strategická hra, ktorá simuluje komplexný proces riadenia slovenskej vlády. Hrajú ako Ing. Mgr. Richard Hangurbadžo, predseda SOCDEM, ktorý musí navigovať cez politické výzvy, parlamentné hlasovanie, mediálne krízy a ďalšie politické engagemenents.

## 🎮 Hlavné systémy

### 📊 Vládny Dashboard
- Schválenie verejnosti
- Ekonomické zdravie
- Stabilita koalície
- Nálada ľudí
- Mediálny tlak
- Úroveň krízy
- Politické body

### 🏛️ Parlamentný Systém
- 150 poslancov
- Reálne hlasovanie (ZA/PROTI/ZDRŽAL SA/NEHLASOVAL)
- Hlasovacia tabuľa
- Vláda a opozícia
- Parlamentné sedenia
- Procedurálne návrhy

### 🏢 Vláda
- Kabinet s ministrami
- 12 ministerstva
- Zasadnutia vlády
- Tlačové konferencie
- Tvorba zákonov

### 📺 Mediálny Systém
- Televízne debaty
- Tlačové správy
- Novináe články
- Analýza sentiment
- Sledovanie mediálneho vplyvu

### 🗺️ Mapa Slovenska
- 8 regiónov
- Podpora voličov
- Ekonomická úroveň
- Nezamestnanosť
- Protesty

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animácie
- **Zustand** - State management

## 📦 Inštalácia

```bash
# Klonuj repozitár
git clone https://github.com/Pikoloai/political-simulator-slovakia.git
cd political-simulator-slovakia

# Nainštaluj dependencies
npm install

# Spusti dev server
npm run dev
```

Hra sa spustí na `http://localhost:3000`

## 🎮 Ako hrať

1. **Spusti hru** - Vyber "Nová hra"
2. **Zadaj meno** - Zadaj tvoje meno
3. **Úvod** - Pozri si cinématiku
4. **Ovládaj vládu** - Naviguj medzi rôznymi modulíami
5. **Strategizuj** - Príjímaj rozhodnutia
6. **Vyhraj** - Udržuj vládu a politickú moc

## 📁 Štruktúra projektu

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Main game page
│   └── globals.css      # Global styles
├── components/
│   ├── MainMenu.tsx     # Главное меню
│   ├── IntroScreen.tsx  # Úvodná cinématika
│   ├── Dashboard.tsx    # Vládny dashboard
│   ├── Parliament.tsx   # Parlamentný systém
│   ├── Government.tsx   # Vláda
│   ├── MediaSystem.tsx  # Mediálny systém
│   └── dashboard/       # Dashboard komponenty
├── stores/
│   └── gameStore.ts     # Zustand game store
├── types/
│   └── game.ts          # TypeScript types
```

## 🎯 Budúce Features

- ✅ Diplomatický systém
- ✅ Volebný systém
- ✅ Systém kríz
- ✅ Ekonomická simulácia
- ✅ Lobovanie a kampane
- ✅ Skandály a korerupcia
- ✅ Ukladanie hier
- ✅ Multiplayer режim

## 📄 Licencia

Copyright © 2024 Pikoloai. All rights reserved.

## 👨‍💻 Autor

**Ing. Mgr. Richard Hangurbadžo** - Vývoj a dizajn

---

**Užite si hru a staňte sa premiérom!** 🎮🇸🇰
