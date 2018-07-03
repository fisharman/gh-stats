import React from 'react';
import { BeatLoader } from 'react-spinners';
import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className="loading-spinner">
      <BeatLoader
       color={'#123abc'}
       loading={props.loading}
      />
    </div>
  )
}

export default LoadingSpinner;