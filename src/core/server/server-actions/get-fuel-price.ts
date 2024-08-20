"use server";

export const fetchFuelPrice = async (): Promise<{ benzine: number; diesel: number; lpg: number }> => {
  try {
    // Fetch data from the TypedDataSet endpoint
    const response = await fetch('https://opendata.cbs.nl/ODataApi/OData/80416ned/TypedDataSet');
    const data = await response.json();

    // Extract the latest prices from the response
    const latestData = data.value[0]; // Get the most recent entry
    const benzinePrice = latestData.BenzineEuro95_1; // Benzine Euro95 price
    const dieselPrice = latestData.Diesel_2; // Diesel price
    const lpgPrice = latestData.Lpg_3; // LPG price

    return {
      benzine: benzinePrice,
      diesel: dieselPrice,
      lpg: lpgPrice,
    };
  } catch (error) {
    console.error('Error fetching fuel prices:', error);
    return { benzine: 0, diesel: 0, lpg: 0 }; // Return default values or handle the error as needed
  }
};