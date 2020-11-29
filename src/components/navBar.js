import React, { useContext } from "react"
import { StaticQuery, Link, graphql } from "gatsby"
import { store } from "src/store"
// import { useMachine } from "@xstate/react"

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
  const sessionMachine = useContext(store)
  const { state } = sessionMachine
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
          {/* <pre>{JSON.stringify(state.context, null, 2)}</pre> */}
          <Navbar
            className="fixed-bottom"
            variant="dark"
            expand="lg"
            id="site-navbar"
          >
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
                  <Link to="/live-gallery" className="link-no-style">
                    <Nav.Link as="span" eventKey="gallery">
                      Live Gallery
                    </Nav.Link>
                  </Link>
                </Nav>
                <NavDropdown title="Pages" id="nav-dropdown" className="dropup">
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
                </NavDropdown>
                {/* <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    {state.value !== "active" ? (
                      <a href="/login">Sign in here</a>
                    ) : (
                      <p>Hello: {state.context.user.username}</p>
                    )}
                  </Navbar.Text>
                </Navbar.Collapse> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    />
  )
}

export default CustomNavbar
