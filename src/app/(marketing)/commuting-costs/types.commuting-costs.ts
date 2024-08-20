export type CalculatorProps = {
    initieleAfstand: number;
    initieleDagen: number;
    initieleVergoedingsPercentage: number;
    initieleVergoedingsTarief: number;
    initieleBrandstofPrijs: number;
    initieleCO2Uitstoot: number;
    initieleKilometervergoeding: number;
    initieleTotaalKosten: number;
    travelDirection:  'single' | 'full';
  };
  
  export type CalculatorState = {
    afstand: number;
    dagen: number;
    vergoedingsPercentage: number;
    vergoedingsTarief: number;
    brandstofPrijs: number;
    co2Uitstoot: number;
    kilometervergoeding: number;
    totaalKosten: number;
  };