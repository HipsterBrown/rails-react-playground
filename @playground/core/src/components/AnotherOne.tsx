import React from 'react';

export const AnotherOne: React.FC<{ message: string }> = ({ message }) => {
  return <h3>{message}</h3>;
};

export default AnotherOne;
