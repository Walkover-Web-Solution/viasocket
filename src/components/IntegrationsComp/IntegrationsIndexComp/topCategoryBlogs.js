import Link from "next/link";
import { RiArrowRightSLine } from "react-icons/ri";

export default function TopCategoryBlogs({ categoryBlogs, categoryName = 'all' }) {
    return (
        <>
            {
                categoryBlogs?.length > 0 && (
                    <div className="container bg-white border custom-border p-6 md:p-12">
                        <h2 className="h2 mb-6">Discover Top {categoryName.toLocaleLowerCase() === 'all' ? '': categoryBlogs?.[0]?.meta?.category} Apps</h2>
                        <div className="space-y-4">
                            {
                                categoryBlogs?.slice(0, 10)?.map?.((blog, index) => (
                                    <div key={index} className="w-fit">
                                        <Link href={'https://viasocket.com/discovery/blog/' + blog?.id + '/' + blog?.meta?.categorySlug + '/' + blog?.slugName} target="_blank" className="transition-all duration-300 ease-in-out text-gray-600 hover:text-black group">
                                            <p className="sub__h1 flex items-center">
                                                <span>{blog?.title}</span>
                                                <span className="ml-2 group-hover:ml-4 transition-all"><RiArrowRightSLine size={20} /></span>
                                            </p>
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </>
    );
}