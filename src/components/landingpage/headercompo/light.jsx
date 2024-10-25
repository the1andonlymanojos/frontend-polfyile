import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import useAnimatedNavToggler from "../headercompo/useAnimatedNavToggler";

import logo from "../../img/logo.svg";
import CloseIcon from "feather-icons/dist/icons/x.svg";
import MenuIcon from "feather-icons/dist/icons/menu.svg";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1280px; /* Corresponds to max-w-screen-xl */
  margin: 0 auto;
`;

export const NavLinks = styled.div`
  display: inline-block;
`;

export const NavLink = styled.a`
  text-lg;
  margin: 0.5rem 0;
  font-weight: 600;
  transition: all 0.3s;
  padding-bottom: 0.25rem;
  border-bottom: 2px solid transparent;

  &:hover,
  &:focus {
    border-color: #3b82f6; /* primary-500 */
    color: #3b82f6; /* primary-500 */
  }

  @media (min-width: 1024px) {
    font-size: 0.875rem; /* lg:text-sm */
    margin: 0 1.5rem;
    margin-top: 0;
  }
`;

export const PrimaryLink = styled(NavLink)`
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  background-color: #3b82f6; /* primary-500 */
  color: white;
  border-bottom: 0;

  &:hover,
  &:focus {
    background-color: #1e40af; /* primary-700 */
    color: #e5e7eb; /* gray-200 */
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1024px) {
    margin: 0;
  }
`;

export const LogoLink = styled(NavLink)`
  display: flex;
  align-items: center;
  font-weight: 800;
  font-size: 2rem;
  margin-left: 0;

  img {
    width: 2.5rem;
    margin-right: 0.75rem;
  }
`;

export const MobileNavLinksContainer = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const NavToggle = styled.button`
  display: none;
  z-index: 20;
  transition: all 0.3s;

  @media (max-width: 1024px) {
    display: block;
  }
`;

export const MobileNavLinks = motion(styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  inset-x: 0;
  margin: 1.5rem 1rem;
  padding: 2rem;
  border: 1px solid;
  text-align: center;
  border-radius: 0.5rem;
  color: #1f2937; /* gray-900 */
  background-color: white;

  ${NavLinks} {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`);

export const DesktopNavLinks = styled.nav`
  display: none;
  flex: 1;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  const defaultLinks = [
    <NavLinks key={1}>
      <NavLink href="/#">About</NavLink>
      <NavLink href="/#">Blog</NavLink>
      <NavLink href="/#">Pricing</NavLink>
      <NavLink href="/#">Contact Us</NavLink>
      <NavLink href="/#" style={{ marginLeft: "3rem" }}>
        Login
      </NavLink>
      <PrimaryLink
        style={roundedHeaderButton ? { borderRadius: "9999px" } : {}}
        href="/#"
      >
        Sign Up
      </PrimaryLink>
    </NavLinks>,
  ];

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss = collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink href="/">
      <img src={logo} alt="logo" />
      Treact
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks style={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer style={collapseBreakpointCss.mobileNavLinksContainer}>
        {logoLink}
        <MobileNavLinks initial={{ x: "150%", display: "none" }} animate={animation} style={collapseBreakpointCss.mobileNavLinks}>
          {links}
        </MobileNavLinks>
        <NavToggle onClick={toggleNavbar} className={showNavLinks ? "open" : "closed"}>
          {showNavLinks ? (
            <img src={CloseIcon} alt="Close" style={{ width: "1.5rem", height: "1.5rem" }} />
          ) : (
            <img src={MenuIcon} alt="Menu" style={{ width: "1.5rem", height: "1.5rem" }} />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* Dynamic break points for navbar */
const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: `
      @media (min-width: 640px) {
        display: none;
      }
    `,
    desktopNavLinks: `
      @media (min-width: 640px) {
        display: flex;
      }
    `,
    mobileNavLinksContainer: `
      @media (min-width: 640px) {
        display: none;
      }
    `,
  },
  md: {
    mobileNavLinks: `
      @media (min-width: 768px) {
        display: none;
      }
    `,
    desktopNavLinks: `
      @media (min-width: 768px) {
        display: flex;
      }
    `,
    mobileNavLinksContainer: `
      @media (min-width: 768px) {
        display: none;
      }
    `,
  },
  lg: {
    mobileNavLinks: `
      @media (min-width: 1024px) {
        display: none;
      }
    `,
    desktopNavLinks: `
      @media (min-width: 1024px) {
        display: flex;
      }
    `,
    mobileNavLinksContainer: `
      @media (min-width: 1024px) {
        display: none;
      }
    `,
  },
  xl: {
    mobileNavLinks: `
      @media (min-width: 1280px) {
        display: none;
      }
    `,
    desktopNavLinks: `
      @media (min-width: 1280px) {
        display: flex;
      }
    `,
    mobileNavLinksContainer: `
      @media (min-width: 1280px) {
        display: none;
      }
    `,
  },
};
