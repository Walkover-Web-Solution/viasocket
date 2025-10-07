export async function convertCurrency(countryCode) {
  try {
    const response = await fetch(`https://flow.sokt.io/func/scriSlHY6j9j?country_code=${countryCode}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data && data[0] && data[0].pricing && data[0].one_time_price) {
      const basePricing = data[0].pricing;
      const oneTimePrice = data[0].one_time_price;
      if (data[2] && data[2].pricing) {
        const creditPricing = data[2].pricing;
        return { basePricing, oneTimePrice, creditPricing };
      }
      return { basePricing, oneTimePrice };
    }
    return { basePricing: 0, oneTimePrice: 0, creditPricing: 0 };
  } catch (error) {
    console.error('Currency conversion failed:', error);
    return { basePricing: 0, oneTimePrice: 0, creditPricing: 0 };
  }
}

export async function formatCurrency(amount, symbol) {
  if (!amount) return '';
  let roundedAmount = Math.round(amount);
  if (roundedAmount > 10000) {
    roundedAmount = Math.round(roundedAmount / 100) * 100; // Round to nearest 100
  }
  else if (roundedAmount > 5000) {
    roundedAmount = Math.round(roundedAmount / 5) * 5; // Round to nearest 5
  }
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };
  const formattedAmount = roundedAmount.toLocaleString('en-US', options);
  return `${symbol}${formattedAmount}`;
}

export async function calculatePricing(symbol, isDeveloping = false, countryCode = 'US') {
  const { basePricing: originalMonthlyPrice, oneTimePrice: originalOneTimePrice } = await convertCurrency(countryCode);
  const originalYearlyPrice = originalMonthlyPrice * 12 * 0.8;
  const originalYearlyMonthlyPrice = originalMonthlyPrice * 0.8;
  let monthlyPrice = originalMonthlyPrice;
  let yearlyPrice = originalYearlyPrice;
  let yearlyMonthlyPrice = originalYearlyMonthlyPrice;
  let oneTimePrice = originalOneTimePrice;
  if (isDeveloping) {
    monthlyPrice = originalMonthlyPrice * 0.5;
    yearlyPrice = originalYearlyPrice * 0.5;
    yearlyMonthlyPrice = originalYearlyMonthlyPrice * 0.5;
  }
  return {
    monthly: await formatCurrency(monthlyPrice, symbol),
    yearly: await formatCurrency(yearlyPrice, symbol),
    yearlyMonthly: await formatCurrency(yearlyMonthlyPrice, symbol),
    oneTime: await formatCurrency(oneTimePrice, symbol),
    monthlyAmount: monthlyPrice,
    yearlyAmount: yearlyPrice,
    yearlyMonthlyAmount: yearlyMonthlyPrice,
    oneTimeAmount: oneTimePrice,
    isDeveloping: isDeveloping,
    originalMonthly: await formatCurrency(originalMonthlyPrice, symbol),
    originalYearly: await formatCurrency(originalYearlyPrice, symbol),
    originalYearlyMonthly: await formatCurrency(originalYearlyMonthlyPrice, symbol),
    originalMonthlyAmount: originalMonthlyPrice,
    originalYearlyAmount: originalYearlyPrice,
    originalYearlyMonthlyAmount: originalYearlyMonthlyPrice
  };
}