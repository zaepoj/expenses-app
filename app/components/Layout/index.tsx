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
  background-color: ${(props) => props.theme.primary};
  height: 100%;
  max-width: 100px;
  box-shadow: rgb(0 0 0 / 10%) 5px 10px 44px;

  @media only screen and (max-width: 700px) {
    flex-direction: column;
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    height: auto;
    width: 100%;
    max-width: 100%;
    border-radius: 0;
    margin-top: 0;
    overflow-x: auto;
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
  width: 50px;
  height: 50px;
  list-style-type: none;
  padding-bottom: 1.5em;
  padding-top: 1.5em;
  display: block;
  font-weight: 500;
  text-align: center;
  margin: auto;
  display: flex;
  justify-content: center;
`;

const StyledNavLink = styled(NavLink)<{ $iscurrentpath?: boolean }>`
  font-size: 1.2em;
  display: flex;
  align-items: center;
  gap: 5%;
  justify-content: center;
  text-decoration: ${(props) => (props.$iscurrentpath ? "underline" : "none")};
  color: ${(props) => props.theme.ghostWhite};
  transition-property: color;
  transition-duration: 0.15s;
  :hover {
    color: ${(props) => props.theme.fadedTeal};
  }
`;

const TooltipText = styled.label`
  visibility: hidden;
  position: absolute;
  margin-left: -1.5em;
  margin-top: 2.5em;
  z-index: 999;
  opacity: 0;
  transition: opacity 0.5s;
  background: black;
  color: ${(props) => props.theme.ghostWhite};
  background: ${(props) => props.theme.primaryDark};
  padding: 0.3em;
  border-radius: 1em;
  font-size: 0.7em;
`;

const IconContainer = styled.div`
  padding: 0.75em;
  background: #1d1228;
  border-radius: 0.5em;
  box-shadow: -15px -15px 69px #180f21, 15px 15px 69px #22152f;
  :hover ${TooltipText} {
    visibility: visible;
    opacity: 1;
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
                  <IconContainer>
                    {Icon && (
                      <Icon
                        fill={
                          location.pathname === item.to ? "#e5bdff" : "white"
                        }
                      />
                    )}{" "}
                    <TooltipText>{item.title}</TooltipText>
                  </IconContainer>
                </StyledNavLink>
              </StyledListItem>
            );
          })}
          <StyledListItem>
            <StyledNavLink to={"/logout"}>
              <IconContainer>
                <IoExitOutline />
                <TooltipText>Logout</TooltipText>
              </IconContainer>
            </StyledNavLink>
          </StyledListItem>
        </StyledUl>
      </StyledNav>
    </Container>
  );
};

export default Layout;
