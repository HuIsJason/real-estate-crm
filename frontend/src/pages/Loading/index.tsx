import React from 'react';
import loadingGif from '../../assets/loading.gif'

const Loading: React.FC = () => {
  return (
    <>
      <img src={loadingGif} alt="loading..." />
    </>
  );
};

export default Loading;
