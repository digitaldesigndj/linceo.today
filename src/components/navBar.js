import React from "react"
import { StaticQuery, Link } from "gatsby"

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
                <Navbar.Brand as="span">Gatsby React Bootstrap</Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="" activeKey={pageInfo && pageInfo.pageName}>
                  <Link to="/gallery" className="link-no-style">
                    <Nav.Link as="span" eventKey="gallery">
                      Gallery
                    </Nav.Link>
                  </Link>
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
                  {/* <NavDropdown.Divider />
                <NavDropdown.Item eventKey="4.4">
                  Separated link
                </NavDropdown.Item> */}
                </NavDropdown>
                {/* <Nav className="ml-auto">
                <Form inline onSubmit={e => e.preventDefault()}>
                  <Form.Group>
                    <FormControl
                      type="text"
                      placeholder="Fake Search"
                      className="mr-2"
                    />
                  </Form.Group>
                  <Button>Fake Button</Button>
                </Form>
              </Nav> */}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </>
      )}
    />
  )
}

export default CustomNavbar
