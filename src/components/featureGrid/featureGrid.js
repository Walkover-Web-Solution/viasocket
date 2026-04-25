import { Scale, CheckCircle, MousePointer2, Shield, Plug, Clock, Sparkles } from 'lucide-react';

const FeatureGrid = ({ featuresData }) => {
    const getIconComponent = (iconName) => {
        switch (iconName) {
            case 'clock':
                return <Clock className="w-9 h-9" />;
            case 'mouse':
                return <MousePointer2 className="w-9 h-9" />;
            case 'shield':
                return <Shield className="w-9 h-9" />;
            case 'check':
                return <CheckCircle className="w-9 h-9" />; // New icon for error-free
            case 'scale':
                return <Scale className="w-9 h-9" />;
            case 'plug':
                return <Plug className="w-9 h-9" />;
            default:
                return <Clock className="w-9 h-9" />;
        }
    };
    return (
        <div className='container cont'>
            <div className="p-12 py-20 bg-black text-white s">
                <div className="flex gap-4">
                    <h2 className="h2 mb-12">Automation That Actually Works For Your Business</h2>
                    <Sparkles className="w-10 h-10" />
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
        </div>
    );
};

export default FeatureGrid;
