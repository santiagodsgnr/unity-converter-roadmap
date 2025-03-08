export const convertUnits = (value, from, to, type) => {
  if (from === to) return value;

  const conversionFactors = {
    length: {
      millimeter: { centimeter: 0.1, meter: 0.001, kilometer: 0.000001, inch: 0.0393701, foot: 0.00328084, yard: 0.00109361, mile: 0.000000621371 },
      centimeter: { millimeter: 10, meter: 0.01, kilometer: 0.00001, inch: 0.393701, foot: 0.0328084, yard: 0.0109361, mile: 0.00000621371 },
      meter: { millimeter: 1000, centimeter: 100, kilometer: 0.001, inch: 39.3701, foot: 3.28084, yard: 1.09361, mile: 0.000621371 },
      kilometer: { millimeter: 1000000, centimeter: 100000, meter: 1000, inch: 39370.1, foot: 3280.84, yard: 1093.61, mile: 0.621371 },
      inch: { millimeter: 25.4, centimeter: 2.54, meter: 0.0254, kilometer: 0.0000254, foot: 0.0833333, yard: 0.0277778, mile: 0.0000157828 },
      foot: { millimeter: 304.8, centimeter: 30.48, meter: 0.3048, kilometer: 0.0003048, inch: 12, yard: 0.333333, mile: 0.000189394 },
      yard: { millimeter: 914.4, centimeter: 91.44, meter: 0.9144, kilometer: 0.0009144, inch: 36, foot: 3, mile: 0.000568182 },
      mile: { millimeter: 1609340, centimeter: 160934, meter: 1609.34, kilometer: 1.60934, inch: 63360, foot: 5280, yard: 1760 }
    },
    weight: {
      milligram: { gram: 0.001, kilogram: 0.000001, ounce: 0.00003527396, pound: 0.00000220462 },
      gram: { milligram: 1000, kilogram: 0.001, ounce: 0.03527396, pound: 0.00220462 },
      kilogram: { milligram: 1000000, gram: 1000, ounce: 35.27396, pound: 2.20462 },
      ounce: { milligram: 28349.5, gram: 28.3495, kilogram: 0.0283495, pound: 0.0625 },
      pound: { milligram: 453592, gram: 453.592, kilogram: 0.453592, ounce: 16 }
    },
    temperature: {
      celsius: { fahrenheit: (v) => v * 1.8 + 32, kelvin: (v) => v + 273.15 },
      fahrenheit: { celsius: (v) => (v - 32) / 1.8, kelvin: (v) => (v - 32) / 1.8 + 273.15 },
      kelvin: { celsius: (v) => v - 273.15, fahrenheit: (v) => (v - 273.15) * 1.8 + 32 }
    }
  };

  const conversion = conversionFactors[type]?.[from]?.[to];

  if (typeof conversion === "function") {
    return Math.round(conversion(value)); // Ejecuta la función de conversión
  }

  return Math.round(value * conversion);
};
