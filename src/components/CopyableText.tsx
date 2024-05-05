import React from 'react';
interface Copyablepropups {
    text: string;
  }
const CopyableText = ({ text }: Copyablepropups) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Text copied to clipboard'))
      .catch(err => console.error('Error copying text: ', err));
  };

  return (
    <div>
      <span onClick={handleCopy} style={{ cursor: 'pointer' }}>{text}</span>
    </div>
  );
};

export default CopyableText;