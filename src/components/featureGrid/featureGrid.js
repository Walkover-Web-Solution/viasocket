import { FaBalanceScale, FaCheckCircle, FaMousePointer, FaShieldAlt } from 'react-icons/fa';
import { FaPlug, FaRegClock } from 'react-icons/fa6';
import { BsStars } from 'react-icons/bs';

const FeatureGrid = ({ featuresData }) => {
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'clock':
                return <FaRegClock size={36} />;
            case 'mouse':
                return <FaMousePointer size={36} />;
            case 'shield':
                return <FaShieldAlt size={36} />;
            case 'check':
                return <FaCheckCircle size={36} />; // New icon for error-free
            case 'scale':
                return <FaBalanceScale size={36} />;
            case 'plug':
                return <FaPlug size={36} />;
            default:
                return <FaRegClock size={36} />;
        }
    };
    return (
        <div className="container p-12 py-20 bg-black text-white">
            <div className="mb-20 flex gap-4">
                <h2 className="h2 mb-4">Automation That Actually Works For Your Business</h2>
                <BsStars size={42} />
            </div>

            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 md:gap-y-20 gap-x-12">
                {featuresData.map((feature, index) => (
                    <div
                        key={index}
                        className="border border-white cont max-w-[500px] mx-auto md:mx-0  lg:py-12 py-8 px-8 transition-transform duration-300 hover:scale-105"
                    >
                        <div className="text-accent mb-4">{getIconComponent(feature.iconName)}</div>
                        <h3 className="h3 font-bold mb-3">{feature.heading}</h3>
                        <p className="sub__h2 text-gray-200">{feature.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureGrid;
