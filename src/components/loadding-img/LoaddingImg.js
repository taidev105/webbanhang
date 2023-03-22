import React from 'react';
import blur from '../../assets/blur.jpeg';

const LoaddingImg = ({ classImg }) => {
  return (
    <div
      className={`${classImg} img-loading`}
      style={{ backgroundImage: `url(${blur})` }}
    ></div>
  );
};

export default LoaddingImg;
