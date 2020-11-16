import React from "react"
import { StaticQuery, Link } from "gatsby"
import useLocalStorage from "src/hooks/useLocalStorage"

import {
  Navbar,
  Nav,
  // Form,
  // FormControl,
  // Button,
  NavDropdown,
  Container,
} from "react-bootstrap"

const CustomNavbar = ({ pageInfo }) => {
  const [session, setSession] = useLocalStorage("session", false)
  console.log(pageInfo)
  return (
    <StaticQuery
      query={graphql`
        query {
          allStrapiPage {
            edges {
              node {
                Slug
                Template
                Title
              }
            }
          }
        }
      `}
      render={data => (
        <>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
          <Navbar variant="dark" expand="lg" id="site-navbar">
            <Container>
              <Link to="/" className="link-no-style">
                <Navbar.Brand as="span">Linceo Today ☀️</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="" activeKey={pageInfo && pageInfo.pageName}>
                  <Link to="/gallery" className="link-no-style">
                    <Nav.Link as="span" eventKey="gallery">
                      Gallery
                    </Nav.Link>
                  </Link>
                  {/* <Link to="/login" className="link-no-style">
                    <Nav.Link as="span" eventKey="connect">
                      Connect
                    </Nav.Link>
                  </Link> */}
                </Nav>
                <NavDropdown title="Pages" id="nav-dropdown">
                  {data.allStrapiPage.edges.map((page, idx) => {
                    return (
                      <NavDropdown.Item
                        eventKey="4.4"
                        key={idx}
                        href={`/${page.node.Slug}`}
                      >
                        <Nav.Link as="span" eventKey={page.node.Slug}>
                          {page.node.Title}
                        </Nav.Link>
                      </NavDropdown.Item>
                    )
                  })}
                  <NavDropdown.Divider />
                  {/* <p> a thing</p> */}
                  {/* <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item> */}
                </NavDropdown>
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as:{" "}
                    {session ? (
                      <a href="/members/profile">{session.user.username}</a>
                    ) : (
                      <a href="/login">nobody</a>
                    )}
                  </Navbar.Text>
                </Navbar.Collapse>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    />
  )
}

export default CustomNavbar
