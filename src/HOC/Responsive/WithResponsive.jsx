import React from 'react';
import { useMediaQuery } from 'react-responsive';

const withResponsive = (WrappedComponent) => {
  return (props) => {
    const isMobile = useMediaQuery({ maxWidth: 767 });
    const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
    const isDesktop = useMediaQuery({ minWidth: 992 });

    return (
      <WrappedComponent
        {...props}
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      />
    );
  };
};

export default withResponsive;