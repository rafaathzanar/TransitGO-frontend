import React from 'react';

function IconImg(props) {
  const { imageSrc, altText, width, height } = props;

  const imageStyle = {
    width: width || '30%', // Default to 100% width if not provided
    height: height || 'auto', // Auto height to maintain aspect ratio
    marginLeft:'100px'
  };

  return (
    <div>
      <img src={imageSrc} alt={altText} style={imageStyle} />
    </div>
  );
}

export default IconImg;
