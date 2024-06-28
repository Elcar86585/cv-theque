import React from 'react';
import ContentLoader from 'react-content-loader';

const LoaderContent = () => (
  <ContentLoader
    speed={2}
    width="100%" 
    height="100%" 
    viewBox="0 0 1200 160"
    backgroundColor="#f0f5f7"
    foregroundColor="#afcceb"
    style={{ width: '100%', height: 'auto' }}
  >
    <rect x="13" y="0" rx="3" ry="3" width="100%" height="11" /> 
    <rect x="15" y="19" rx="3" ry="3" width="100%" height="11" />
    <rect x="15" y="38" rx="3" ry="3" width="100%" height="11" />
    <rect x="16" y="75" rx="3" ry="3" width="50%" height="11" />
    <rect x="16" y="57" rx="3" ry="3" width="70%" height="11" />
  </ContentLoader>
);

export default LoaderContent;