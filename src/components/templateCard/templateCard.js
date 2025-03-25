import Image from 'next/image';
import { HiArrowRight } from 'react-icons/hi2';
import { FiPlus } from 'react-icons/fi';
import { IoMdStopwatch } from 'react-icons/io';
import { MdOutlineWebhook } from 'react-icons/md';
import { DiJsBadge } from 'react-icons/di';
import Link from 'next/link';

const TemplateCard = ({ template }) => {
    const serviceNames = template?.published_json_script?.trigger?.serviceName?.split(' ') || [];
    const rootActions = template?.published_json_script?.order?.root || [];
    const blocks = template?.published_json_script?.blocks || {};

    return (
        <div className="border rounded-lg hover:shadow-xl w-full max-w-[1200px] ">
            <div className="h-[500px] flex gap-4 ">
                <div className="w-full h-full  border-black px-8 cont justify-center items-center bg-[#F6EFFC]">
                    <div className="bg-white w-3/4 border shadow-md rounded-md">
                        <div>
                            <div className="bg-[#E1F4FF] px-2 py-1 border-b">
                                <p>Trigger: </p>
                            </div>
                            <div className="px-2 py-1 flex items-center gap-2">
                                {template?.published_json_script?.trigger?.iconUrl ? (
                                    <Image
                                        src={template?.published_json_script?.trigger?.iconUrl}
                                        width={20}
                                        height={20}
                                    />
                                ) : (
                                    <>
                                        {template?.published_json_script?.trigger?.triggerType === 'cron' ? (
                                            <IoMdStopwatch />
                                        ) : (
                                            <MdOutlineWebhook />
                                        )}
                                    </>
                                )}

                                <p>{template?.published_json_script?.trigger?.triggerType}</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-4 w-0 border border-gray-600 opacity-75"></div>

                    <div className="w-3/4 cont bg-[#E1F4FF] rounded-md shadow-md p-2 overflow-hidden">
                        {rootActions?.length > 0 ? (
                            rootActions.map((action) => {
                                const block = blocks[action];
                                return (
                                    <>
                                        <div className=" px-2 flex gap-4 items-center mb-2">
                                            <HiArrowRight color="black" size={16} />
                                            {block?.iconUrl ? (
                                                <Image src={block?.iconUrl} alt={action} width={20} height={20} />
                                            ) : (
                                                <DiJsBadge color="black" size={16} />
                                            )}
                                            <p>{action}</p>
                                        </div>
                                    </>
                                );
                            })
                        ) : (
                            <div className="px-2 flex items-center gap-4">
                                <HiArrowRight color="black" size={16} />
                                <p>No steps added</p>
                            </div>
                        )}
                    </div>
                    <div className="h-4 w-0 border border-gray-600 opacity-75"></div>
                    <div className="border border-black p-1 rounded-sm opacity-75">
                        <FiPlus size={16} />
                    </div>
                </div>

                <div className="w-full h-full flex flex-col gap-8 justify-center px-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="h1">{template?.title}</h1>
                        <h2 className="sub__h1">{template?.metadata?.description}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {serviceNames?.map((name, index) => (
                            <span key={index} className="px-4 py-2 bg-black text-white hover:bg-accent">
                                {name}
                            </span>
                        ))}
                    </div>
                    <div className="flex justify-end">
                        <Link href={`https://flow.viasocket.com/template/${template?.id}`}>
                            <button className="btn btn-accent ">Use This Template</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateCard;
