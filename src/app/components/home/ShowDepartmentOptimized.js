'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import style from './showDepartment.module.css';

export default function ShowDepartmentOptimized() {
    const departments = ['Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Operation', 'Legal'];

    const [currentDepartment, setCurrentDepartment] = useState('Marketing');
    const [isAnimating, setIsAnimating] = useState(false);
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
                setTimeout(() => {
                    setCurrentDepartment((prevDepartment) => {
                        const currentIndex = departments.indexOf(prevDepartment);
                        const nextIndex = (currentIndex + 1) % departments.length;
                        return departments[nextIndex];
                    });
                    setIsAnimating(false);
                }, 500);
            }, 2000);
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
    }, [isInView, departments]);

    return (
        <div 
            ref={sectionRef}
            className={`${style['department-section']} relative my-20 py-20`}
        >
            <div className="container">
                <h4 className="font-semibold text-xl mb-1">Automate your entire team</h4>
                <h2 className={`font-bold mb-10 flex flex-col ${style['main-heading']}`}>
                    <span className="mr-4">We Have Workflows for</span>
                    <span className={`${isAnimating ? style['animating-out'] : ''} text-accent`}>
                        {currentDepartment}
                    </span>
                </h2>
                <Link target="_blank" href="/departments" className="btn btn-accent">
                    See all use cases
                </Link>
            </div>
        </div>
    );
}
