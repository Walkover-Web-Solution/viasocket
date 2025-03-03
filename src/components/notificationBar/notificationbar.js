import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NotificationBar() {
    const [data, setData] = useState(null);
    useEffect(() => {
        getDbdashDataa();
    }, []);

    const getDbdashDataa = async () => {
        const response = await fetch('https://plugservice-api.viasocket.com/api/notification-content');
        const dbdashData = await response.json();
        setData(dbdashData.data.rows);
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);
    return (
        <div
            className="w-full min-h-[36px] transition-colors "
            style={{
                backgroundColor: data && data[5]?.details ? data[5]?.details : '#3B474F',
                color: data && data[6]?.details ? data[6]?.details : '#3B474F',
            }}
        >
            {data && data[0]?.details && !loading ? (
                <div className="container p-2 flex flex-wrap items-center justify-center  ">
                    <Link
                        href={data[1]?.details && data[1]?.details}
                        target="_blank"
                        className=" text-white text-sm flex items-center flex-wrap gap-2"
                        aria-label="update"
                    >
                        <span
                            className="  text-xs  px-2 h-fit"
                            style={{
                                backgroundColor: data[3]?.details,
                                color: data[4]?.details,
                            }}
                        >
                            {data[2]?.details}
                        </span>
                        {data[0]?.details}{' '}
                        {data[7]?.details && <div className="underline text-xs">{data[7]?.details}</div>}
                    </Link>
                </div>
            ) : (
                <div className="container p-2 flex flex-wrap items-center justify-center animate-pulse  ">
                    <div className="w-[400px] flex gap-2 items-center justify-center">
                        <div className="h-4 bg-gray-600  w-[70px]"></div>
                        <div className="h-4 bg-gray-600  w-[300px]"></div>
                        <div className="h-4 bg-gray-600  w-[70px]"></div>
                    </div>
                </div>
            )}
        </div>
    );
}
