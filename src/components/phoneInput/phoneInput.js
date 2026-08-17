'use client';

import { useEffect, useRef } from 'react';
import { PhoneNumberUtil } from 'google-libphonenumber';

const phoneUtil = PhoneNumberUtil.getInstance();
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const DEFAULT_COUNTRY_ISO = 'IN';

// Dial codes come from google-libphonenumber rather than a list of our own, so
// they stay correct as the library is updated. Built once per page load.
export const COUNTRY_CODES = phoneUtil
    .getSupportedRegions()
    .map((iso) => ({
        iso,
        dial: `+${phoneUtil.getCountryCodeForRegion(iso)}`,
        name: regionNames.of(iso) || iso,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

export const countryByIso = (iso) =>
    COUNTRY_CODES.find((country) => country.iso === iso) ||
    COUNTRY_CODES.find((country) => country.iso === DEFAULT_COUNTRY_ISO);

/**
 * A phone number field that reports which country the number belongs to.
 *
 * The parent owns the values; every change — picking a country, typing, or the
 * one-off location lookup — arrives through `onChange` as
 * `{ number, countryIso, countryCode, country }` so it can be merged into an
 * existing form state in one go.
 */
export default function PhoneInput({
    value = '',
    countryIso = DEFAULT_COUNTRY_ISO,
    onChange,
    name = 'phoneNumber',
    placeholder = 'Phone Number',
    className = '',
    maxLength,
    required = false,
}) {
    // Kept in refs so the location lookup below can read the latest without
    // re-running when the parent passes a fresh callback on every render.
    const onChangeRef = useRef(onChange);
    const valueRef = useRef(value);
    onChangeRef.current = onChange;
    valueRef.current = value;

    const emit = (iso, number) => {
        const country = countryByIso(iso);
        onChangeRef.current?.({
            number,
            countryIso: country?.iso || '',
            countryCode: country?.dial || '',
            country: country?.name || '',
        });
    };

    // Start on the visitor's own country so most people never touch the picker.
    // Best effort: the current selection stands if the lookup fails.
    useEffect(() => {
        let active = true;

        const detectCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/', { headers: { Accept: 'application/json' } });
                if (!response.ok) return;

                const { country_code: iso } = await response.json();
                if (!active || !COUNTRY_CODES.some((country) => country.iso === iso)) return;

                emit(iso, valueRef.current);
            } catch (error) {
                console.error('Could not detect the country:', error?.message || error);
            }
        };

        detectCountry();
        return () => {
            active = false;
        };
    }, []);

    return (
        <div className="flex gap-2">
            <select
                aria-label="Country code"
                className="select select-bordered w-[120px] shrink-0 focus:outline-none"
                value={countryIso}
                onChange={(event) => emit(event.target.value, value)}
            >
                {COUNTRY_CODES.map((country) => (
                    <option key={country.iso} value={country.iso}>
                        {country.dial} {country.iso}
                    </option>
                ))}
            </select>
            <input
                required={required}
                type="tel"
                name={name}
                placeholder={placeholder}
                className={`input input-bordered w-full focus:outline-none ${className}`}
                value={value}
                onChange={(event) => emit(countryIso, event.target.value)}
                maxLength={maxLength}
            />
        </div>
    );
}
