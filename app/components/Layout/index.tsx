import styled from "styled-components";
import { NavLink } from "@remix-run/react";
import { FaBeer } from "react-icons/fa";
import { IconType } from "react-icons";

const Container = styled.div`
  display: flex;
  padding-top: 5em;
  padding-bottom: 5em;
  background: #fdfdff;
  height: 100%;

  @media only screen and (max-width: 640px) { 
    flex-direction: column;
    padding-top: 0;

  }
`;

const StyledNav = styled.nav`
  width: 250px;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #ded9d975, rgba(0, 0, 0, 0)) 1 100%;
  border-left: 0;

  @media only screen and (max-width: 640px) { 
    width: 100%;
    border-bottom: 1px solid #ded9d975;
  }
  
`;

const ContentContainer = styled.div`
  height: 100%;
  flex: 1;
  padding-left: 2em;
  padding-top: 2em;

  @media only screen and (max-width: 600px) { 
    padding-left: 0;
  }
`;

const Content = styled.div`
  padding: 1em;
  padding-top: 0;
  flex: 1;
  height: 100%;


`;

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;

  @media only screen and (max-width: 640px) { 
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
`

const StyledNavLink = styled(NavLink)`
  font-size: 1.3em;
  display: flex;
  align-items: center;
  gap: 5%;
  justify-content: center;
  text-decoration: none;
  color: ${(props) => props.theme.purple1};
  transition-property: color;
  transition-duration: 0.25s;
  :hover {
    color: ${(props) => props.theme.fadedTeal};
  }
`;

type NavItem = {
  to: string;
  title: string;
  icon?: IconType;
};

type LayoutProps = {
  children: JSX.Element;
  navItems: NavItem[];
};

const Layout = (props: LayoutProps) => {
  return (
    <Container>
      <StyledNav>
        <StyledUl>
          {props.navItems.map((item, key) => {
            const Icon= item.icon
            return (
              <StyledListItem key={key}>
               <StyledNavLink to={item.to}> {Icon && <Icon />}  {item.title}</StyledNavLink>
              </StyledListItem>
            );
          })}
        </StyledUl>
      </StyledNav>

      <ContentContainer>
        <Content>{props.children}</Content>
      </ContentContainer>
    </Container>
  );
};

export default Layout;
