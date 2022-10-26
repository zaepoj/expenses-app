import styled from "styled-components";
import { NavLink } from "@remix-run/react";

const Container = styled.div`
  display: flex;
  padding-top: 5em;
  padding-bottom: 5em;
  background: #fdfdff;
  height: 100%;
`;

const StyledNav = styled.nav`
  width: 250px;
  border-width: 3px;
  border-style: solid;
  border-image: linear-gradient(to bottom, #ded9d975, rgba(0, 0, 0, 0)) 1 100%;
  border-left: 0;
`;

const ContentContainer = styled.div`
  height: 100%;
  flex: 1;
  padding-left: 2em;
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
`;

const StyledListItem = styled.li`
  list-style-type: none;
  padding-bottom: 2em;
  display: block;
  font-weight: 700;
  text-align: center;
`;

type NavItem = {
  to: string;
  title: string;
};

type LayoutProps = {
  children: JSX.Element;
  navItems: NavItem[];
};

const Layout = (props: LayoutProps) => {
  console.log(props);
  return (
    <Container>
      <StyledNav>
        <StyledUl>
          {props.navItems.map((item, key) => {
            return (
              <StyledListItem key={key}>
                <NavLink to={item.to}>{item.title}</NavLink>
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
