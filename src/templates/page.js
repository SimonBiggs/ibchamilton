import React from 'react';
import styled from 'react-emotion';
import Link from 'gatsby-link';

import Container from '../components/Container';
import screenSizes from '../utils/screen-sizes';

const PageLayout = styled(Container)`
  @media (min-width: ${screenSizes.MEDIUM}) {
    display: flex;
  }
`;

const SideNav = styled.div`
  display: none;

  @media (min-width: ${screenSizes.MEDIUM}) {
    display: block;
    flex: 0 1 auto;
    max-width: 15rem;
  }
`;

const SideNavList = styled.ul`
  margin-right: 2rem;
  padding-right: 2rem;
  border-right: 1px solid #cacaca;

  li {
    font-size: 1.25rem;
    list-style: none;

    :not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }
`;

const MainContent = styled.div`
  flex: 1 0 0;
`;

export default ({ data }) => {
  const post = data.markdownRemark;
  const subPages = data.allMarkdownRemark.edges;
  const showSideNav = !!subPages && subPages.length > 1;

  return (
    <PageLayout>
      {showSideNav && (
        <SideNav>
          <SideNavList>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const { fields: { slug }, frontmatter: { title } } = node;

              return (
                <li key={slug}>
                  <Link to={slug}>{title}</Link>
                </li>
              );
            })}
          </SideNavList>
        </SideNav>
      )}
      <MainContent>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </MainContent>
    </PageLayout>
  );
};

export const query = graphql`
  query PageQuery($slug: String!, $subNavSlugRegex: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
    allMarkdownRemark(
      filter: { fields: { slug: { regex: $subNavSlugRegex } } }
      sort: { fields: [fields___slug] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`;
