import { useState } from 'react';
import PropTypes from 'prop-types';

export default function ColorConverter({ color }) {
  
  function hexToRgb(color) {
    const colorString = color.slice(1);

    const hexPairs = [
      colorString.slice(0, 2),
      colorString.slice(2, 4),
      colorString.slice(4),
    ];

    let rgbString = `rgb (${hexPairs.map((pair) => parseInt(pair, 16)).join(', ')})`;

    return rgbString;
  }

  function checkString(string) {
    return /[^a-fA-F0-9]/.test(string.slice(1));
  } 

  const [hexColor, setHexColor] = useState(color);
  const [convert, setRGBText] = useState({text: hexToRgb(color), color});
  
  const onColorChange = (e) => {
    if (e.target.value.length > 7) return;

    if (!e.target.value.length) {
      setHexColor('#');
      return;
    };
    
    setHexColor(e.target.value);

    if (e.target.value.length === 7) {
      if (checkString(e.target.value)) {
        setRGBText((prev) => ({...prev, text: 'Ошибка!', color: '#CD5C5C'}));
        return;
      };

      setRGBText((prev) => ({...prev, text: hexToRgb(e.target.value), color: e.target.value}));
    }
  }

  return (
    <div className='color-container' style={{backgroundColor: convert.color}}>
      <input className="color-input box" value={hexColor} onChange={onColorChange}/>
      <div className='convertered-field box'>{convert.text}</div>
    </div>
  );
}

ColorConverter.propTypes = {
  color: PropTypes.string,
};
