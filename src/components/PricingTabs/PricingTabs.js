
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { calculatePricing } from "@/utils/currencyConverter";
import { detectUserCountry } from "@/utils/locationDetector";

const arrowIcon = (
    <svg viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg" className="arrow-icon">
        <g className="arrow-head">
            <path d="M1 1C4.5 4 5 4.38484 5 4.5C5 4.61516 4.5 5 1 8" stroke="currentColor" strokeWidth="1.5" />
        </g>
        <g className="arrow-body">
            <path d="M3.5 4.5H0" stroke="currentColor" strokeWidth="1.5" />
        </g>
    </svg>
);

export default function PricingTabsClient({countries}) {
  const [activeTab, setActiveTab] = useState("monthly");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryData, setSelectedCountryData] = useState(null);
//   const [discount, setDiscount] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pricing, setPricing] = useState({ monthly: '$79', yearly: '$758.40', yearlyMonthly: '$63.20', oneTime: '$99' });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  // Auto-detect user location on component mount
  useEffect(() => {
    const autoDetectLocation = async () => {
      if (countries && countries.length > 0 && !selectedCountry) {
        setIsDetectingLocation(true);
        try {
          const detectedCountry = await detectUserCountry();
          console.log('Detected country:', detectedCountry);
          
          // Find matching country in the countries list
          const matchingCountry = countries.find(c => 
            c.country.toLowerCase() === detectedCountry.toLowerCase() ||
            c.country.toLowerCase().includes(detectedCountry.toLowerCase()) ||
            detectedCountry.toLowerCase().includes(c.country.toLowerCase())
          );
          
          if (matchingCountry) {
            setSelectedCountry(matchingCountry.country);
            console.log('Auto-selected country:', matchingCountry.country);
          }
        } catch (error) {
          console.log('Location detection failed:', error.message);
          // Silently fail - user can manually select country
        } finally {
          setIsDetectingLocation(false);
        }
      }
    };

    autoDetectLocation();
  }, [countries, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      const country = countries.find(c => c.country === selectedCountry);
      setSelectedCountryData(country);
    //   if (country && country.discount) {
    //     setDiscount(parseFloat(country.discount));
    //   } else {
    //     setDiscount(null);
    //   }
      
      // Calculate pricing based on selected country's currency
      if (country && country.currency && country.symbol) {
        calculatePricing(country.currency, country.symbol).then(newPricing => {
          setPricing(newPricing);
        }).catch(error => {
          console.error('Error calculating pricing:', error);
          // Keep default pricing on error
        });
      }
    } else {
      setSelectedCountryData(null);
    //   setDiscount(null);
      setPricing({ monthly: '$79', yearly: '$758.40', yearlyMonthly: '$63.20', oneTime: '$99' });
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.custom-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-8">
        <div className="flex items-end w-full flex-col gap-2">
        <p className="text-lg text-gray-600 w-[300px]">50% off for developing countries</p>
          <div className="flex items-center bg-white">
            <div className="relative custom-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="border text-lg custom-border py-1 pr-12 bg-white cursor-pointer w-[300px] 
                         focus:outline-none flex relative gap-2 px-4"
              >
                {selectedCountryData ? (
                  <div className="flex items-center gap-2">
                    <img src={selectedCountryData.img} alt={selectedCountryData.country} className="w-6 h-4" />
                    <span>{selectedCountryData.country}</span>
                    <span className="text-gray-600">{selectedCountryData.currency}</span>
                  </div>
                ) : (
                  <span>{isDetectingLocation ? "Detecting location..." : "Select Country"}</span>
                )}
                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                  <svg 
                    className={`w-5 h-5 text-black transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isDropdownOpen && (
                <ul className="absolute top-full left-0 w-full bg-white border custom-border border-t-0 max-h-60 overflow-y-auto z-50 shadow-lg">
                  {countries.map((country, index) => (
                    <li
                      key={index}
                      onClick={() => handleCountrySelect(country.country)}
                      className="px-4 py-1 text-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 border-b border-gray-100 last:border-b-0 flex items-center gap-2"
                    >
                      <img src={country.img} alt={country.country} className="w-6 h-4" />
                      <p>{country.country}</p>
                      <p className="text-gray-600">{country.currency}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* <div className="border text-lg custom-border p-1 border-l-0 w-[70px] text-center">
              {discount !== null ? `${discount}%` : "0%"}
            </div> */}
          </div>
        </div>
        <div className="flex items-center bg-white">
            <button onClick={() => setActiveTab("monthly")} 
          className={`border text-xl custom-border p-4 w-[200px] ${activeTab === "monthly" ? "font-semibold" : ""}`}>Monthly</button>
            <button onClick={() => setActiveTab("yearly")}  className={`border text-xl custom-border p-4 border-l-0 w-[200px] ${activeTab === "yearly" ? "font-semibold" : ""}`}>Yearly  <span className="text-accent font-normal">(20% off)</span> </button>
        </div>
        <div className="flex flex-col items-center mt-4 w-full">
                <div className="w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="border custom-border bg-white p-12 flex flex-col gap-2 justify-between">
                        <h3 className="h2">Starter</h3>
                        <div className="cont gap-1 flex flex-col flex-1 py-4">
                            <p className="h3 text-accent">Free</p>
                            <p className="text-lg font-semibold">2000 tasks/month</p>
                            <p className="text-lg font-semibold">500 Credits/month</p>
                            <p className="h6 text-gray-600">
                                Pay-as-you-go with free credits
                            </p>
                        </div>
                        <Link href="/signup?utm_source=pricing/free">
                            <button className="btn btn-accent">Get Started</button>
                        </Link>
                    </div>
                    <div>
                        <div className="border custom-border bg-white p-12 flex flex-col gap-2 justify-between">
                        <h3 className="h2">Premium</h3>
                        <div className="cont gap-1 flex flex-col flex-1 pb-4">
                            <p className="h3 text-accent">{activeTab === "monthly" ? `${pricing.monthly} / month` : `${pricing.yearlyMonthly} / month`}</p>
                            <p className="text-lg font-semibold">15k tasks/month</p>
                            <p className="text-lg font-semibold">5k Credits/month</p>
                            <p className="h6 text-gray-600">
                                50% extra credit when buying additional credits
                            </p>
                            <p className="text-lg font-semibold">Priority support</p>
                            <p>One-time <span className="font-semibold">{pricing.oneTime}</span></p>
                            <p>Use this to hire automation experts</p>
                        </div>
      
                        <Link href="/signup?utm_source=pricing/premium">
                            <button className="btn btn-accent">Get Started</button>
                        </Link>
                    </div>
                    </div>
                    <div className="border custom-border bg-white p-12 flex flex-col gap-2 justify-between">
                        <h3 className="h2">Enterprise</h3>
                        <div className="cont gap-1 flex flex-col flex-1 pb-4">
                            <p className="h3 text-accent">Contact for pricing</p>
                        </div>
                        <Link href="/signup?utm_source=pricing/enterprise">
                            <button className="btn btn-accent">Talk to sales</button>
                        </Link>
                    </div>
                </div>
  
        </div>
    </div>
    );
}
