const { de } = require('date-fns/locale');
import Image from 'next/image';

function IconWrapper({
    component = null,
    iconUrl = 'https://cdn-icons-png.flaticon.com/512/380/380127.png',
}) {
    // If no component is provided, use default <Image>
    component = component || (
        <Image
            src={iconUrl}
            alt="Default app icon"
            className="h-full w-full border p-1 object-contain"
            width={30}
            height={30}
        />
    );

    return (
        <div className="h-8 w-8 flex items-center justify-center" >
            {component}
        </div>
    );
}

export default IconWrapper;
