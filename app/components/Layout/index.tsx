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
  background: #fdfdff;
  height: 100%;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    position: static;
    height: auto;
  }
`;

const StyledNav = styled.nav`
  width: 250px;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #ded9d975, rgba(0, 0, 0, 0)) 1 100%;
  border-left: 0;

  @media only screen and (max-width: 700px) {
    width: 100%;
    border: 0;
    border-bottom: 2px solid #ded9d975;
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
  font-weight: 700;
  text-align: center;
`;

const StyledNavLink = styled(NavLink)<{ $iscurrentpath?: boolean }>`
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 5%;
  justify-content: center;
  text-decoration: ${(props) => (props.$iscurrentpath ? "underline" : "none")};
  color: ${(props) => props.theme.primaryText};
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
