import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { calculatePricing } from "@/utils/currencyConverter";
import { detectUserCountry } from "@/utils/locationDetector";
import { FaCrown, FaGem } from "react-icons/fa";
import { IoMdSearch, IoMdInformationCircleOutline } from "react-icons/io";
import MoreCreditComp from "./moreCreditComp";
import { GiCheckMark } from "react-icons/gi";

export default function PricingTabsClient({ countries }) {
  const [activeTab, setActiveTab] = useState("yearly");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryData, setSelectedCountryData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [pricing, setPricing] = useState({ monthly: '$79', yearly: '$758.40', yearlyMonthly: '$63.20', oneTime: '$99', originalMonthly: '$79', originalYearlyMonthly: '$63.20' });
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const autoDetectLocation = async () => {
      if (countries && countries.length > 0 && !selectedCountry) {
        setIsDetectingLocation(true);
        try {
          const detectedCountry = await detectUserCountry();
          // If user denied permission, detectUserCountry returns null. Respect that and skip auto-selection.
          if (typeof detectedCountry !== 'string' || !detectedCountry.trim()) {
            return;
          }

          const dc = detectedCountry.trim();
          let matchingCountry = null;
          matchingCountry = countries.find(c =>
            c.country.toLowerCase() === dc.toLowerCase()
          );
          if (!matchingCountry) {
            matchingCountry = countries.find(c =>
              c.country.toLowerCase().includes(dc.toLowerCase())
            );
            if (!matchingCountry && dc.length > 4) {
              matchingCountry = countries.find(c =>
                dc.toLowerCase().includes(c.country.toLowerCase())
              );
            }
          }
          if (matchingCountry) {
            setSelectedCountry(matchingCountry.country);
            setSearchTerm(matchingCountry.country);
          }
        } catch (error) {
          console.log('Location detection failed:', error.message);
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
      if (country && country.currency && country.symbol && country.codes) {
        const isDeveloping = country.isdeveloping === true;
        calculatePricing(country.symbol, isDeveloping, country.codes).then(newPricing => {
          setPricing(newPricing);
        }).catch(error => {
          console.error('Error calculating pricing:', error);
          setPricing({ monthly: '$79', yearly: '$758.40', yearlyMonthly: '$63.20', oneTime: '$99', isDeveloping: false, originalMonthly: '$79', originalYearlyMonthly: '$63.20' });
        });
      }
    } else {
      setSelectedCountryData(null);
      setPricing({ monthly: '$79', yearly: '$758.40', yearlyMonthly: '$63.20', oneTime: '$99', isDeveloping: false, originalMonthly: '$79', originalYearlyMonthly: '$63.20' });
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!countries || !searchTerm.trim()) return;
    const matchingCountry = countries.find(c =>
      c.country.toLowerCase() === searchTerm.toLowerCase() ||
      c.currency === searchTerm.toUpperCase()
    );
    if (matchingCountry) {
      setSelectedCountry(matchingCountry.country);
      setSearchTerm("");
    }
  };

  return (
    <div className="flex flex-col items-center  lg:gap-20 md:gap-16 gap-12">
      <MoreCreditComp selectedCountryData={selectedCountryData} />
      <div className="cont w-full">
        <div className="w-full cont lg:flex-row items-center gap-4 justify-between">
          <div className="cont items-start gap-2">
            <h2 className="h2 w-full" >Do more with viaSocket.</h2>
            <h3 className="h3" >Upgrade to access advanced features designed for growing businesses</h3>
          </div>
          <div className="flex items-end flex-col gap-2 w-full md:w-[350px]">
            {
              selectedCountryData &&
              selectedCountryData.isdeveloping === true &&
              <p className="text-lg w-full">50% off for developing nations</p>
            }
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full custom-dropdown"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <IoMdSearch className="h-5 w-5" />
              </span>
              <input
                type="text"
                placeholder="Search country or currency..."
                value={searchTerm || (isDetectingLocation ? "Detecting location..." : "")}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
                className="focus:outline-none text-lg pl-10 pr-4 py-2 w-full border custom-border bg-white"
              />
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

              {isDropdownOpen && countries && countries.length > 0 && (
                <ul className="absolute top-full left-0 w-full bg-white border custom-border max-h-60 overflow-y-auto scrollbar-none z-50 shadow-lg">
                  {countries
                    .filter((c) =>
                      c.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      c.currency.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((country, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          handleCountrySelect(country.country);
                          setSearchTerm(country.country);
                        }}
                        className="px-4 py-2 text-lg cursor-pointer hover:bg-gray-100 flex items-center gap-2"
                      >
                        <Image
                          src={country.img}
                          alt={country.country}
                          width={24}
                          height={16}
                          className="w-6 h-4"
                        />
                        <span>{country.country}</span>
                        <span className="text-gray-600">{country.currency}</span>
                      </li>
                    ))}
                </ul>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center mt-4 w-full">
          <div className="w-full flex flex-col lg:flex-row gap-8">
            <div className="lg:w-[60%] cont gap-8 border custom-border p-6 lg:p-12 bg-white">
              <div className="cont flex flex-col lg:flex-row items-center gap-2 justify-between">
                <div className="flex gap-4">
                  <div className="text-accent text-3xl mt-1"><FaGem /></div>
                  <h3 className="h2">Premium</h3>
                </div>
                <div>
                  <div className="flex items-center border custom-border ">
                    <button
                      onClick={() => setActiveTab("monthly")}
                      className={`text-sm py-4 px-2 w-[150px] border-r custom-border transition-all duration-200
                      ${activeTab === "monthly"
                          ? "bg-black text-white"
                          : "bg-white"
                        }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setActiveTab("yearly")}
                      className={`text-sm py-4 px-2 w-[150px] transition-all duration-200
                      ${activeTab === "yearly"
                          ? "bg-black text-white"
                          : "bg-white"
                        }`}
                    >
                      Yearly{" "}
                      <span
                        className={`ml-1 font-normal text-accent ${activeTab === "yearly" ? "text-white" : "text-accent"
                          }`}
                      >
                        (20% off)
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {pricing.isDeveloping ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <p className="h3 text-accent">{activeTab === "monthly" ? `${pricing.monthly}/month` : `${pricing.yearlyMonthly}/month`}</p>
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-full font-semibold">50% OFF</span>
                    </div>
                    <p className="text-lg text-gray-500 line-through">{activeTab === "monthly" ? `${pricing.originalMonthly}/month` : `${pricing.originalYearlyMonthly}/month`}</p>
                  </div>
                ) : (
                  <div>
                    <p className="h3 text-accent">{activeTab === "monthly" ? `${pricing.monthly}/month` : `${pricing.yearlyMonthly}/month`}</p>
                    {activeTab === "yearly" && <p className="text-lg text-gray-500 line-through">{`${pricing.originalMonthly}/month`}</p>}
                  </div>
                )}
              </div>

              <Link href="/signup?utm_source=pricing/premium" className="w-[50%] md:w-[30%]">
                <button className="btn btn-accent w-full">
                  Get Started
                </button>
              </Link>

              <div className="border-t-2 border-dotted border-gray-400 my-2"></div>

              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-base font-semibold mb-3">Premium plan includes:</h4>
                  <ul className="flex flex-col gap-2 text-md">
                    <li className="flex items-center gap-2">
                      <GiCheckMark className="text-accent"/>
                      15k tasks/month
                      <div className="relative group inline-flex items-center">
                        <IoMdInformationCircleOutline className="text-gray-600 cursor-pointer" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-[220px]">
                          <div className="relative">
                            <div className="rounded bg-black text-white text-sm px-3 py-2 shadow">
                              A single action your workflow completes, like sending an email or updating a sheet.
                            </div>
                            <div className="w-2 h-2 bg-black rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GiCheckMark className="text-accent"/>
                      5k Credits/month
                      <div className="relative group inline-flex items-center">
                        <IoMdInformationCircleOutline className="text-gray-600 cursor-pointer" />
                        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block z-50 w-[220px]">
                          <div className="relative">
                            <div className="rounded bg-black text-white text-sm px-3 py-2 shadow">
                              Credits are used to run paid built-in plugs like SMS, WhatsApp, or AI agents, and can also extend your workflow by converting to tasks when needed.
                            </div>
                            <div className="w-2 h-2 bg-black rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li className="flex items-center gap-2">
                      <GiCheckMark className="text-accent"/>
                      50% extra credit when buying additional credits
                    </li>
                    <li className="flex items-center gap-2">
                      <GiCheckMark className="text-accent"/>
                      Priority support
                    </li>
                  </ul>
                </div>
              </div>
              <div className="-mx-6 -mb-6 lg:-mx-12 lg:-mb-12 cont gap-6 border-t custom-border bg-gradient-to-r from-[#faf9f6] to-white p-6 lg:p-12 lg:flex-row">
                <div className="cont gap-3">
                  <span className="px-3 py-1 text-xs font-semibold text-white bg-black rounded-full w-fit">
                    🎁  <span className="ml-2">One Time Bonus</span>
                  </span>
                  <p className="h3 text-accent font-bold">{`${pricing.oneTime} Bonus`}</p>
                  <p className="text-gray-700 text-md">Use this to take help from experts</p>
                </div>
                <div className="flex items-center md:justify-center flex-1 overflow-hidden">
                  <div className="flex -space-x-5">
                    <Image
                      src="/review-image/1.svg"
                      alt="Customer support expert avatar"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                    <Image
                      src="/review-image/2.svg"
                      alt="Technical support expert avatar"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                    <Image
                      src="/review-image/3.svg"
                      alt="Automation specialist expert avatar"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                    <Image
                      src="/review-image/4.svg"
                      alt="Integration expert avatar"
                      width={80}
                      height={80}
                      className="w-20 h-20"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-[40%] cont gap-8 border custom-border p-6 lg:p-12 bg-white">

              <div className="flex items-center gap-4">
                <div className="text-accent text-3xl mt-1"><FaCrown /></div>
                <h3 className="h2">Enterprise</h3>
              </div>
              <p className="h3 text-accent">Custom</p>


              <Link href="/signup?utm_source=pricing/enterprise" className="w-[50%]">
                <button className="w-full btn btn-accent">
                  Contact Sales
                </button>
              </Link>


              <div className="border-t-2 border-dotted border-gray-400 my-2"></div>


              <div className="flex flex-col gap-3">
                <h4 className="text-base font-semibold">Enterprise plan includes:</h4>
                <ul className="flex flex-col gap-2 text-md">
                  <li className="flex items-center gap-2">
                    <GiCheckMark className="text-accent"/>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center gap-2">
                    <GiCheckMark className="text-accent"/>
                    SLA-backed priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <GiCheckMark className="text-accent"/>
                    Custom integrations & onboarding
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}