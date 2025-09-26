const { de } = require("date-fns/locale");

function IconWrapper({
  hideBorder = true,
  component = null,
  size,
  iconUrl = 'https://cdn-icons-png.flaticon.com/512/380/380127.png',
  className = '',
  onClick = () => { }
}) {
  // If no component is provided, use default <img>
  component = component || <img src={iconUrl} alt='' onClick={onClick} className={`w-full h-full object-contain ${className}`} />

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