import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import Container from '../components/Container';

const PageWrapper = styled(Container)`
  @media (min-width: 768px) {
    text-align: center;
  }
`;

const IndexPage = props => (
  <PageWrapper>
    <h2>Regular Services</h2>
    <h3>Sunday @ 9:30 &amp; 10:30 am</h3>
    <h3>Wednesday @ 7:00 pm</h3>

    <h2>Location</h2>

    <iframe
      width="100%"
      height="450"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      src="https://maps.google.com/maps?oe=utf-8&amp;client=firefox-a&amp;ie=UTF8&amp;q=1770+Eaton+Ave+Hamilton,+OH+45013&amp;fb=1&amp;split=1&amp;gl=us&amp;cid=8168267082802788523&amp;li=lmd&amp;s=AARTsJqO2big0ld5vcsctzOUG2yYgQC-0w&amp;ll=39.435978,-84.581144&amp;spn=0.007955,0.013733&amp;z=16&amp;iwloc=A&amp;output=embed"
    />
  </PageWrapper>
);

export default IndexPage;
