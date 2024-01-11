'use client';

import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import SearchForm from './search-form';
import { getPathsFromCurrentLocation, routeFilters } from '../common/helper';
import { WEBSITE_NAME, HOME_PATH } from '../common/constants';
import { type RouteFilter } from '../common/types';

const getRouteFilterKey = (pathname: string) => {
  const { basePath, param } = getPathsFromCurrentLocation(pathname);
  if (basePath === HOME_PATH) return param || routeFilters[0].key;
  return null;
};

function buildNavItems(routeFilterList: RouteFilter[]) {
  return routeFilterList.map((item) => {
    const navItemClass = classNames({
      filter: true,
      // active: item.key === routeFilterKey,
    });

    return (
      <Nav.Item key={item.value}>
        <Nav.Link href={`/${HOME_PATH}/${item.key}`} className={navItemClass}>
          {item.value}
        </Nav.Link>
      </Nav.Item>
    );
  });
}

export default function NavBar() {
  const pathname = usePathname();
  const routeFilterKey = getRouteFilterKey(pathname);
  const navItems = buildNavItems(routeFilters);

  return (
    <Navbar fixed="top" bg="dark" variant="dark" expand="md" className="nav-menu bg-black">
      <Container>
        <Navbar.Brand href="/">{WEBSITE_NAME}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav activeKey={`/${HOME_PATH}/${routeFilterKey}`} className="mr-auto">
            {navItems}
          </Nav>
          <Nav>
            <Nav.Item>
              {/* Fixed issue with spacebar text in search via https://github.com/react-bootstrap/react-bootstrap/issues/2934   */}
              <div className="nav-link">
                <SearchForm />
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
