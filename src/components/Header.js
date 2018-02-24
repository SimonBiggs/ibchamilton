import React, { Component } from 'react';
import styled, { css, cx } from 'react-emotion';
import Img from 'gatsby-image';
import Link from 'gatsby-link';

import Container from '../components/Container';
import screenSizes from '../utils/screen-sizes';

const Wrapper = styled.header`
  position: relative;
  height: 32rem;

  @media (min-width: ${screenSizes.MEDIUM}) {
    height: 35rem;
  }
`;

const HeaderContents = styled.div`
  position: relative;
`;

const HeroImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .gatsby-image-outer-wrapper,
  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

const Nav = styled(Container)`
  position: relative;
  font-size: 1.5rem;
  color: white;
`;

const flexContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DesktopNav = styled.div`
  display: none;

  @media (min-width: ${screenSizes.MEDIUM}) {
    ${flexContainer};
  }
`;

const MobileNav = styled.div`
  @media (min-width: ${screenSizes.MEDIUM}) {
    display: none;
  }

  .hamburger {
    position: absolute;
    top: 1.25rem;
    left: 1.25rem;
    display: inline-block;
    width: 33px;
    height: 22px;
    cursor: pointer;
    z-index: 1;

    span {
      display: block;
      width: 33px;
      height: 4px;
      margin-bottom: 5px;
      border-radius: 3px;
      background: white;
      opacity: 1;
      transform-origin: 4px 0;
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
        background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
      z-index: 1;

      :nth-of-type(3) {
        transform-origin: 0% 100%;
      }
    }

    + .menu {
      display: flex;
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      width: 300px;
      max-width: 90%;
      padding: 4.5rem 0 0 1.25rem;
      background-color: #fcfcfc;
      box-shadow: 4px 0 4px 0 rgba(0, 0, 0, 0.24);
      transform-origin: 0% 0%;
      transform: translate(-100%, 0) translate(-5px, 0);
      transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
      z-index: 0;

      .nav {
        width: 100%;
        padding-bottom: 1rem;

        li {
          :not(:last-child) {
            margin-bottom: 1rem;
          }

          a {
            display: inline-block;
            text-decoration: none;
          }
        }
      }
    }

    &.active {
      position: fixed;

      span {
        background: #232323;

        &:nth-of-type(1) {
          transform: rotate(45deg) translate(-2px, -1px);
        }

        &:nth-of-type(2) {
          opacity: 0;
          transform: rotate(0deg) scale(0.2, 0.2);
        }

        &:nth-of-type(3) {
          transform: rotate(-45deg) translate(0, -1px);
        }
      }

      + .menu {
        transform: translate(0, 0);

        .nav {
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
        }
      }
    }
  }
`;

const DesktopNavList = styled.ul`
  ${flexContainer};
  justify-content: flex-end;
  flex: 1 0 auto;
  margin-left: auto;
  list-style: none;
  font-size: 1.25rem;

  li:not(:first-child) {
    margin-left: 1rem;
  }

  li > ul {
    display: none;
  }
`;

const MainHeader = styled.h1`
  margin-top: 10rem;
  padding: 0 0.5rem;
  font-size: 3rem;
  font-weight: 400;
  text-align: center;
  color: white;

  @media (min-width: ${screenSizes.SMALL}) {
    margin-top: 15rem;
  }

  @media (min-width: ${screenSizes.MEDIUM}) {
    font-size: 4rem;
    margin-top: 20rem;
  }
`;

const SubHeader = styled.h2`
  margin-top: 1rem;
  padding: 0 0.5rem;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 200;
  text-align: center;
  color: white;

  @media (min-width: ${screenSizes.MEDIUM}) {
    margin-top: 2rem;
  }
`;

const generateNavItems = (pages, invertColors) => {
  const navItems = pages.reduce((items, page) => {
    const {
      node: { html, fields: { slug }, frontmatter: { title, navTitle } },
    } = page;
    const isRootPage = slug.match(/\//g).length === 2;

    if (isRootPage) {
      const subNavItems = pages
        .filter(
          ({ node: { fields: { slug: pageSlug } } }) =>
            pageSlug !== slug && ~pageSlug.indexOf(slug)
        )
        .map(
          ({
            node: {
              fields: { slug: pageSlug },
              frontmatter: { title: pageTitle, navTitle: pageNavTitle },
            },
          }) => ({ slug: pageSlug, title: pageNavTitle || pageTitle })
        );

      const navItem = {
        slug: !html ? subNavItems[0].slug : slug,
        title: navTitle || title,
        subNavItems,
      };

      items.push(navItem);
    }

    return items;
  }, []);

  return navItems.map(({ slug, title, subNavItems }) => (
    <li key={slug}>
      <Link to={slug} className={cx(flexContainer, { inverse: invertColors })}>
        {title}
      </Link>

      {subNavItems.length > 0 && (
        <ul>
          {subNavItems.map(({ slug: subNavSlug, title: subNavTitle }) => (
            <li key={subNavSlug}>
              <Link
                to={subNavSlug}
                className={cx(flexContainer, { inverse: invertColors })}
              >
                {subNavTitle}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  ));
};

class Header extends Component {
  state = {
    mobileNavOpen: false,
  };

  render() {
    const { mobileNavOpen } = this.state;
    const { title, description, imageSizes, pages } = this.props;
    const mainHeader = title || 'Immanuel Baptist Church';
    const subHeader = !title
      ? 'The church on the hill with Hamilton on our hearts'
      : description;

    return (
      <Wrapper>
        {!!imageSizes && (
          <HeroImage>
            <Img
              style={{ maxHeight: '100%', objectFit: 'cover' }}
              sizes={imageSizes}
            />
            <Backdrop />
          </HeroImage>
        )}
        <HeaderContents>
          <Nav>
            <MobileNav
              onClick={e => {
                if (e.defaultPrevented) {
                  document.body.classList.remove('no-scroll');
                }
              }}
            >
              <div
                role="button"
                className={cx('hamburger', { active: mobileNavOpen })}
                onClick={() =>
                  this.setState(prevState => {
                    const mobileNavOpen = !prevState.mobileNavOpen;

                    if (mobileNavOpen) {
                      document.body.classList.add('no-scroll');
                    } else {
                      document.body.classList.remove('no-scroll');
                    }

                    return { mobileNavOpen };
                  })
                }
              >
                <span />
                <span />
                <span />
              </div>
              <div className="menu">
                <ul className="nav">
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  {generateNavItems(pages)}
                </ul>
              </div>
            </MobileNav>
            <DesktopNav>
              <Link to="/" className={`${flexContainer} inverse`}>
                Immanuel Baptist Church
              </Link>
              <DesktopNavList>{generateNavItems(pages, true)}</DesktopNavList>
            </DesktopNav>
          </Nav>
          <MainHeader>{mainHeader}</MainHeader>
          {!!subHeader && <SubHeader>{subHeader}</SubHeader>}
        </HeaderContents>
      </Wrapper>
    );
  }
}

export default Header;
