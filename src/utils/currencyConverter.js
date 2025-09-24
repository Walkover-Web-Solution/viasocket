// Fallback currency conversion rates (base: USD) - used if API fails
const FALLBACK_CURRENCY_RATES = {
  'USD': 1.00,
  'EUR': 0.85,
  'GBP': 0.73,
  'INR': 83.12,
  'CAD': 1.35,
  'AUD': 1.52,
  'JPY': 149.50,
  'SGD': 1.35,
  'HKD': 7.83,
  'CHF': 0.88,
  'SEK': 10.85,
  'NOK': 10.75,
  'DKK': 6.85,
  'PLN': 4.15,
  'CZK': 22.50,
  'HUF': 360.00,
  'RON': 4.65,
  'BGN': 1.80,
  'HRK': 6.90,
  'RUB': 95.00,
  'TRY': 27.50,
  'BRL': 5.15,
  'MXN': 17.25,
  'ARS': 350.00,
  'CLP': 890.00,
  'COP': 4100.00,
  'PEN': 3.75,
  'UYU': 39.50,
  'CNY': 7.25,
  'KRW': 1340.00,
  'THB': 36.50,
  'MYR': 4.65,
  'IDR': 15300.00,
  'PHP': 56.50,
  'VND': 24500.00,
  'ZAR': 18.75,
  'EGP': 30.90,
  'NGN': 775.00,
  'KES': 150.00,
  'GHS': 12.00,
  'MAD': 10.15,
  'TND': 3.10,
  'AED': 3.67,
  'SAR': 3.75,
  'QAR': 3.64,
  'KWD': 0.31,
  'BHD': 0.38,
  'OMR': 0.38,
  'JOD': 0.71,
  'ILS': 3.70,
  'LBP': 15000.00,
  'PKR': 280.00,
  'BDT': 110.00,
  'LKR': 325.00,
  'NPR': 133.00,
  'AFN': 70.00,
  'IRR': 42000.00,
  'IQD': 1310.00,
  'SYP': 2512.00,
  'YER': 250.00,
  'UZS': 12200.00,
  'KZT': 450.00,
  'KGS': 89.00,
  'TJS': 10.95,
  'TMT': 3.50,
  'AZN': 1.70,
  'GEL': 2.65,
  'AMD': 385.00,
  'BYN': 3.25,
  'UAH': 36.50,
  'MDL': 18.00,
  'RSD': 108.00,
  'MKD': 56.50,
  'ALL': 95.00,
  'BAM': 1.80,
  'ISK': 138.00,
  'NZD': 1.65,
  'FJD': 2.25,
  'PGK': 3.75,
  'SBD': 8.45,
  'TOP': 2.35,
  'VUV': 120.00,
  'WST': 2.70,
  'XPF': 110.00,
  'NCX': 110.00,
  'ETB': 55.50,
  'DJF': 177.00,
  'SOS': 570.00,
  'UGX': 3750.00,
  'TZS': 2500.00,
  'RWF': 1250.00,
  'BIF': 2850.00,
  'KMF': 450.00,
  'MGA': 4500.00,
  'MUR': 45.50,
  'SCR': 13.50,
  'MWK': 1700.00,
  'ZMW': 25.50,
  'BWP': 13.60,
  'SZL': 18.75,
  'LSL': 18.75,
  'NAD': 18.75,
  'AOA': 825.00,
  'CDF': 2700.00,
  'XAF': 600.00,
  'XOF': 600.00,
  'GMD': 67.00,
  'GNF': 8600.00,
  'LRD': 190.00,
  'SLE': 22.50,
  'CVE': 101.00,
  'STN': 22.50,
  'SHP': 0.73,
  'FKP': 0.73,
  'GIP': 0.73,
  'JEP': 0.73,
  'GGP': 0.73,
  'IMP': 0.73
};

const BASE_PRICE_USD = 79; // Base monthly price in USD

// Cache for exchange rates
let cachedRates = null;
let cacheTimestamp = null;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Fetch real-time exchange rates from API
export async function fetchExchangeRates() {
  try {
    const response = await fetch('https://open.er-api.com/v6/latest/USD');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    if (data.result === 'success' && data.rates) {
      cachedRates = data.rates;
      cacheTimestamp = Date.now();
      console.log('Exchange rates updated successfully');
      return data.rates;
    } else {
      throw new Error('Invalid API response format');
    }
  } catch (error) {
    console.warn('Failed to fetch exchange rates from API:', error.message);
    console.log('Using fallback rates');
    return FALLBACK_CURRENCY_RATES;
  }
}

// Get current exchange rates (cached or fresh)
export async function getCurrentRates() {
  // Check if we have cached rates and they're still valid
  if (cachedRates && cacheTimestamp && (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return cachedRates;
  }
  
  // Fetch fresh rates
  return await fetchExchangeRates();
}

export async function convertCurrency(amount, fromCurrency = 'USD', toCurrency) {
  const rates = await getCurrentRates();
  
  if (!toCurrency || !rates[toCurrency]) {
    return amount;
  }
  
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Convert to USD first if not already
  const usdAmount = fromCurrency === 'USD' ? amount : amount / rates[fromCurrency];
  
  // Convert from USD to target currency
  const convertedAmount = usdAmount * rates[toCurrency];
  
  return convertedAmount;
}

export async function formatCurrency(amount, currency, symbol) {
  if (!amount || !currency) return '';
  
  const rates = await getCurrentRates();
  
  // Format based on currency
  const options = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
  
  // For currencies with large values, show no decimals
  if (rates[currency] && rates[currency] > 100) {
    options.maximumFractionDigits = 0;
  }
  
  const formattedAmount = amount.toLocaleString('en-US', options);
  
  return `${symbol}${formattedAmount}`;
}

export async function calculatePricing(currency, symbol, isYearly = false) {
  if (!currency || !symbol) {
    return {
      monthly: '$79',
      yearly: '$758.40',
      oneTime: '$99'
    };
  }
  
  const monthlyPrice = await convertCurrency(BASE_PRICE_USD, 'USD', currency);
  const yearlyPrice = monthlyPrice * 12 * 0.8; // 20% discount for yearly
  const oneTimePrice = await convertCurrency(99, 'USD', currency); // Convert $99 one-time fee
  
  return {
    monthly: await formatCurrency(monthlyPrice, currency, symbol),
    yearly: await formatCurrency(yearlyPrice, currency, symbol),
    oneTime: await formatCurrency(oneTimePrice, currency, symbol),
    monthlyAmount: monthlyPrice,
    yearlyAmount: yearlyPrice,
    oneTimeAmount: oneTimePrice
  };
}

export { FALLBACK_CURRENCY_RATES, BASE_PRICE_USD };
