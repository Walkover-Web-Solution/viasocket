const { de } = require("date-fns/locale");
import Image from 'next/image';

function IconWrapper({
  hideBorder = true,
  component = null,
  size,
  iconUrl = 'https://cdn-icons-png.flaticon.com/512/380/380127.png',
  className = '',
  onClick = () => { }
}) {
  // If no component is provided, use default <Image>
  component = component || <Image src={iconUrl} alt='Default app icon' onClick={onClick} className={`w-full h-full object-contain ${className}`} width={40} height={40} />

  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-center ${hideBorder ? '' : 'border border-gray-300'
        }`}
      style={{ width: size, height: size }}
    >
      {component}
    </div>
  );
}

export default IconWrapper;