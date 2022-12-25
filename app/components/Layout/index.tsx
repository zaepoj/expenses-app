import styled from "styled-components";
import { NavLink } from "@remix-run/react";
import type { IconType } from "react-icons";
import { IoExitOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  display: flex;
  padding-top: 5em;
  padding-bottom: 5em;
  background-color: #fdfdff;
  height: 100%;
  border-radius: 0 3em 3em 0;
  max-height: 80vh;
  max-width: 250px;
  margin-top: 0.5em;
  box-shadow: rgb(0 0 0 / 6%) 0px 4px 44px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    height: auto;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    margin-top: 0;
    overflow: auto;
    white-space: nowrap;
  }
`;

const StyledNav = styled.nav`
  width: 250px;

  @media only screen and (max-width: 700px) {
    width: 100%;
    border: 0;
  }
`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;

  @media only screen and (max-width: 700px) {
    display: flex;
    gap: 5%;
    padding: 1em;
  }
`;

const StyledListItem = styled.li`
  list-style-type: none;
  padding-bottom: 1.5em;
  padding-top: 1.5em;
  display: block;
  font-weight: 500;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)<{ $iscurrentpath?: boolean }>`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 5%;
  justify-content: center;
  text-decoration: ${(props) => (props.$iscurrentpath ? "underline" : "none")};
  color: ${(props) => props.theme.primaryDark};
  transition-property: color;
  transition-duration: 0.25s;
  :hover {
    color: ${(props) => props.theme.fadedPrimaryText}
  }
`;

type NavItem = {
  to: string;
  title: string;
  icon?: IconType;
};

type LayoutProps = {
  navItems: NavItem[];
  userInfo: UserInfo;
};

type UserInfo = {
  uid: string;
  name: string;
};

const Layout = (props: LayoutProps) => {
  const location = useLocation();
  return (
    <Container>
      <StyledNav>
        <StyledUl>
          {props.navItems.map((item, key) => {
            const Icon = item.icon;
            return (
              <StyledListItem key={key}>
                <StyledNavLink
                  $iscurrentpath={location.pathname === item.to}
                  to={item.to}
                >
                  {" "}
                  {Icon && <Icon />} {item.title}
                </StyledNavLink>
              </StyledListItem>
            );
          })}
          <StyledListItem>
            <StyledNavLink to={"/logout"}>
              <IoExitOutline /> Logout
            </StyledNavLink>
          </StyledListItem>
        </StyledUl>
      </StyledNav>
    </Container>
  );
};

export default Layout;
