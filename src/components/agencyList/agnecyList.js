import Link from 'next/link';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import Image from 'next/image';
import { MdCheckCircle, MdChevronRight } from 'react-icons/md';
import Script from 'next/script';
import RequestMeetingComp from '../requestMeetingComp/RequestMeetingComp';

const AgencyList = ({ agencies, type }) => {
    const itemsPerPage = 12;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const paginatedAgencies = agencies.slice(offset, offset + itemsPerPage);
    return (
        <>
            <div className="grid row-1 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {paginatedAgencies &&
                    paginatedAgencies.map((agency, index) => {
                        if (
                            (type === 'verified' && agency?.verified) ||
                            (type === 'nonverified' && agency?.verified == null)
                        ) {
                            return (
                                <div className="" key={index + offset}>
                                    <div className="flex flex-col col-span-1 bg-white border overflow-hidden  border-slate-200  h-full">
                                        <div className="p-6">
                                            <div className={` h-[30px] pe-16`}>
                                                {agency?.logo ? (
                                                    <Image
                                                        className={`w-auto max-w-full  h-full  ${agency?.background_color && agency?.background_color !== '#F5F5F5' ? 'p-1 ' : 'p-0'}`}
                                                        style={{
                                                            backgroundColor:
                                                                agency?.background_color &&
                                                                agency?.background_color !== '#F5F5F5'
                                                                    ? agency.background_color
                                                                    : '',
                                                        }}
                                                        src={agency?.logo[0] || 'https://placehold.co/40x40'}
                                                        width={1080}
                                                        height={1080}
                                                        alt="img"
                                                    />
                                                ) : (
                                                    <h3 className="text-sm">{agency?.name}</h3>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-6 grid gap-1 h-full">
                                            <div className="flex items-center gap-2">
                                                <h2 className="text-xl font-semibold">{agency?.name}</h2>
                                                {agency?.verified && <MdCheckCircle className="" color="#2A81FC" />}
                                            </div>

                                            <p className="text-slate-400 font-light text-sm">
                                                {agency?.website ? agency?.website : '-'}
                                            </p>
                                            <p className=" text-slate-400 font-light text-sm ">
                                                {agency?.location ? agency?.location : '-'}
                                            </p>
                                            <button
                                                onClick={() =>
                                                    document.getElementById('meeting_request_form').showModal()
                                                }
                                                className="col-link text-blue-500 text-sm text-start flex items-center gap-1"
                                            >
                                                Schedule a meet
                                                <MdChevronRight fontSize={16} />
                                            </button>
                                            <RequestMeetingComp agencyName={agency?.name} />
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                    })}
            </div>

            <ReactPaginate
                pageCount={Math.ceil(agencies.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName={'pagination'}
                activeClassName={'active'}
                forcePage={currentPage}
            />
            <Script
                id="interface-main-script"
                interface_id="661e755cc1d6c9e580f9b084"
                src="https://interface-embed.viasocket.com/interface-prod.js"
            ></Script>
        </>
    );
};

export default AgencyList;
