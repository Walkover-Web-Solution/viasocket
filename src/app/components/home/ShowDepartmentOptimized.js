'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import style from './showDepartment.module.css';
import Image from 'next/image';

const departmentsData = [
    {
        name: 'Marketing',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/3/imgii5od9_marketing.png"
    },
    {
        name: 'Sales',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/4/imgxna8gp_sales.png"
    },
    {
        name: 'HR',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/1/imgizt1sf_hr.jpeg"
    },
    {
        name: 'Finance',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/2/imgiv36vz_Accounting.jpeg"
    },
    {
        name: 'IT',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/6/imgvvnz5t_IT.png"
    },
    {
        name: 'Operation',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/5/imgdy8a40_Operations.png"
    },
    {
        name: 'Legal',
        img_src: "https://storage.googleapis.com/dbdash-static.intospace.io/images/65d2ed33fa9d1a94a5224235/tblghuop9/card_image/7/img9k6zqs_Legal.jpg"
    }
];

export default function ShowDepartmentOptimized() {
    const [deptIndex, setDeptIndex] = useState(0);
    const currentDepartment = departmentsData[deptIndex];

    const [isAnimating, setIsAnimating] = useState(false);
    const [imgAnimating, setImgAnimating] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);
    const intervalRef = useRef(null);

    // Set up the intersection observer to detect when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.3 } // Trigger when 30% of the element is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    // Start/stop animation based on visibility
    useEffect(() => {
        if (isInView) {
            // Start animation only when in view
            intervalRef.current = setInterval(() => {
                setIsAnimating(true);
                setImgAnimating(true);
                setTimeout(() => {
                    setDeptIndex((prev) => (prev + 1) % departmentsData.length);
                    setIsAnimating(false);
                    setImgAnimating(false);
                }, 700);
            }, 4500);
        } else {
            // Stop animation when not in view
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [isInView, departmentsData]);

    useEffect(() => {
        departmentsData.forEach((dept) => {
            const img = new window.Image();
            img.src = dept.img_src;
        });
    }, []);

    return (
        <div
            ref={sectionRef}
            className={`${style['department-section']} relative my-20 py-20`}
        >
            <div className="container flex lg:flex-row flex-col gap-8 justify-between items-center">
                <div>
                    <h4 className="font-semibold text-xl mb-1">Automate your entire team</h4>
                    <h2 className={`font-bold mb-10 flex flex-col ${style['main-heading']}`}>
                        <span className="mr-4">We Have Workflows for</span>
                        <span className={`${isAnimating ? style['animating-out'] : ''} text-accent`}>
                            {currentDepartment.name}
                        </span>
                    </h2>
                    <Link target="_blank" href="/departments" className="btn btn-accent">
                        See all use cases
                    </Link>
                </div>
                <div className="relative w-full max-w-[500px] min-w-[400px] h-[320px] overflow-hidden">
                    <Image
                        key={currentDepartment.img_src}
                        src={currentDepartment.img_src}
                        alt={currentDepartment.name}
                        fill
                        priority
                        className={`
                            object-cover transition-all duration-700 ease-in-out
                            ${imgAnimating
                                ? "opacity-0 -translate-x-12 scale-95"
                                : "opacity-100 translate-x-0 scale-100"}
                        `}
                    />
                </div>

            </div>
        </div>
    );
}
