const { de } = require('date-fns/locale');
import Image from 'next/image';

function IconWrapper({
    hideBorder = true,
    component = null,
    size,
    iconUrl = 'https://cdn-icons-png.flaticon.com/512/380/380127.png',
    className = '',
    onClick = () => {},
}) {
    // If no component is provided, use default <Image>
    component = component || (
        <Image
            src={iconUrl}
            alt="Default app icon"
            onClick={onClick}
            className={`h-6 w-6 object-contain ${className}`}
            width={30}
            height={30}
        />
    );

    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-center ${hideBorder ? '' : 'border border-gray-300'}`}
            style={{ width: size, height: size }}
        >
            {component}
        </div>
    );
}

export default IconWrapper;
