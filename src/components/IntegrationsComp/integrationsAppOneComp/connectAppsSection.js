'use client';
import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { hexToRgb } from "./shared";
import createURL from "@/utils/createURL";
import IntegrationSearchApps from "../integrationsAppComp/integrationSearchApps";
import { APPERPAGE } from "@/const/integrations";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

// ─── Pair App Card ───────────────────────────────────────────────────
function PairAppCard({ name, icon, href }) {
  return (
    <Link
      href={href}
      className="brand-color-card group flex items-center gap-4 cursor-pointer no-underline py-4 px-[18px]"
    >
      <div className="relative shrink-0 overflow-hidden w-[34px] h-[34px] bg-white border primary-border shadow-sm transition-all duration-200">
        <Image alt={name} src={icon || 'https://placehold.co/40x40'} width={32} height={32} className="absolute inset-[10%] w-[80%] h-[80%] object-contain" />
      </div>
      <span className="min-w-0 text-[15px] font-semibold text-[#1f2937] truncate transition-colors duration-200 group-hover:text-[#0a0a0a]">{name}</span>
      <ArrowRight size={16} className="ml-auto shrink-0 text-[#d1d5db] opacity-50 transition-all duration-200 group-hover:text-[var(--bc)] group-hover:opacity-100 group-hover:translate-x-[2px]" />
    </Link>
  );
}

// ─── Connect Apps Section ────────────────────────────────────────────
export default function ConnectAppsSection({ brandColor, appOneDetails, apps, pageInfo, integrationsInfo, combosData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedApps, setSearchedApps] = useState([]);
  const [debounceValue, setDebounceValue] = useState("");

  const appName = appOneDetails?.name || "App";
  const appSlug = appOneDetails?.appslugname;
  const hasEvents = appOneDetails?.events?.length > 0;

  const handleSearchResults = useCallback((results) => {
    setSearchedApps(results);
  }, []);

  const handleDebounceValueChange = useCallback((value) => {
    setDebounceValue(value);
  }, []);

  const showNext = apps?.length > 0 && APPERPAGE <= apps?.length;

  const goToNext = () => {
    if (integrationsInfo?.appone) {
      return `/integrations/${integrationsInfo?.appone}/page/${Number(integrationsInfo?.page) + 1}`;
    } else if (integrationsInfo?.category && !integrationsInfo?.page) {
      return `${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
    } else {
      return `${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) + 1}`;
    }
  };

  const goToPrev = () => {
    if (integrationsInfo?.category && !integrationsInfo?.page) {
      return `/${pageInfo?.pathArray.join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
    } else {
      return `/${pageInfo?.pathArray.slice(0, -2).join('/')}/page/${Number(integrationsInfo?.page) - 1}`;
    }
  };

  const displayApps = debounceValue
    ? searchedApps
    : apps?.filter((app) => app?.appslugname !== appSlug)?.slice(0, 12);

  if (!hasEvents) return null;

  return (
    <section
      className="section"
      style={{ "--bc": brandColor, "--bc-rgb": hexToRgb(brandColor) }}
    >
      {/* Section heading */}
      <div className="mb-5">
        <div className="accent-bar rounded-sm mb-3.5" style={{ background: brandColor || "#000000" }} />
        <h2 className="heading2">
          Pair <span style={{ color: brandColor || "#000000" }}>{appName}</span> with your favorite app
        </h2>
      </div>

      {/* Unified pairing container */}
      <div className="section-container mt-7">
        {/* Header bar */}
        <div className="flex items-center gap-3 sm:gap-4 p-4 border-b primary-border" style={{ backgroundColor: brandColor || '#000000' }}>
          <div className="w-11 h-11 bg-white border-2 border-white overflow-hidden shadow-md relative shrink-0 hidden sm:block">
            <Image alt={appName} src={appOneDetails?.iconurl || 'https://placehold.co/40x40'} width={32} height={32} className="absolute inset-[12%] w-[76%] h-[76%] object-contain" />
          </div>
          <span className="text-2xl font-semibold text-white/85 leading-none hidden sm:inline">+</span>
          <IntegrationSearchApps
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearchResults={handleSearchResults}
            onDebounceValueChange={handleDebounceValueChange}
            app={appOneDetails}
          />
        </div>

        {/* Body: app grid */}
        <div className="p-4 sm:p-7">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayApps?.map((app, index) => (
              <PairAppCard
                key={index}
                name={app?.name}
                icon={app?.iconurl}
                href={createURL(`/integrations/${appSlug}/${app?.appslugname}`)}
              />
            ))}
          </div>

          {debounceValue && (!displayApps || displayApps.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12">
              <span>No apps match &ldquo;{searchTerm}&rdquo;</span>
              <span className="text-xs mt-1">Try a different search term</span>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {!searchTerm && (combosData?.combinations?.length > 0 || hasEvents) && (
        <div className="flex justify-end items-end gap-2 w-full mt-4">
          {integrationsInfo?.page > 0 && (
            <Link className="outline-button gap-1 !px-5" href={createURL(goToPrev())}>
              <GrFormPreviousLink size={20} /> Prev
            </Link>
          )}
          {showNext && (
            <Link className="outline-button gap-1 !px-5" href={createURL(goToNext())}>
              Next <GrFormNextLink size={20} />
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
