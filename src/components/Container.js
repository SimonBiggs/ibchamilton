import React from 'react';
import styled from 'react-emotion';
import screenSizes from '../utils/screen-sizes';

export default styled.div`
  padding: 1rem;

  @media (min-width: ${screenSizes.MEDIUM}) {
    padding: 1rem 2rem;
  }

  @media (min-width: ${screenSizes.XLARGE}) {
    max-width: calc(${screenSizes.XLARGE} + 4rem);
    margin: 0 auto;
  }
`;
