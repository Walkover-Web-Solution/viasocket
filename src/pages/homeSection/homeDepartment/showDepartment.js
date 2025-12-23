import { useState, useEffect } from 'react';
import style from './showDepartment.module.css';
import Link from 'next/link';

const ShowDepartment = () => {
    const departments = ['That 😎', 'Marketing', 'Sales', 'HR', 'Finance', 'IT', 'Operation', 'Legal'];

    const [currentDepartment, setCurrentDepartment] = useState(departments[0]);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const intervalId = setInterval(() => {
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

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className={`${style['department-section']} relative my-20 py-20`}>
            <div className="container">
                <h4 className="font-semibold text-xl mb-1">Automate your entire team</h4>
                <h2 className={`font-bold line-height-1 flex flex-wrap md:gap-1 gap-2 mb-10 ${style['main-heading']}`}>
                    <span className="mr-4">We Have a Workflow for</span>
                    <span className={`${isAnimating ? style['animating-out'] : ''} text-accent`}>
                        {currentDepartment}
                    </span>
                </h2>
                <Link target="_blank" href="/departments" className="btn btn-accent">
                    See all use case
                </Link>
            </div>
        </div>
    );
};

export default ShowDepartment;
