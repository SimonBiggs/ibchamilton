import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Header from '../components/Header';

const TemplateWrapper = props => {
  const {
    children,
    layoutContext: { title },
    data: { heroImage, allMarkdownRemark: { edges } },
  } = props;

  return (
    <div>
      <Helmet
        title="Immanuel Baptist Church"
        link={[{ rel: 'shortcut icon', href: '/favicon.png' }]}
        meta={[
          {
            name: 'description',
            content: 'The church on the hill with Hamilton on our hearts.',
          },
          { name: 'keywords', content: 'hamilton, ohio, church, baptist' },
        ]}
      />

      <Header title={title} pages={edges} imageSizes={heroImage.sizes} />

      {props.children()}
    </div>
  );
};

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export const layoutQuery = graphql`
  query LayoutQuery($imageRegex: String = "/hero.jpg/") {
    heroImage: imageSharp(id: { regex: $imageRegex }) {
      sizes(maxWidth: 1024) {
        ...GatsbyImageSharpSizes
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___order] }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            navTitle
          }
        }
      }
    }
  }
`;

export default TemplateWrapper;
