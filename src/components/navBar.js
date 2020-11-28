import React, { useState, useEffect } from "react"
import { StaticQuery, Link } from "gatsby"
import useLocalStorage from "src/hooks/useLocalStorage"
// import { storageAvailable } from "src/util"

import {
  Navbar,
  Nav,
  // Form,
  // FormControl,
  // Button,
  NavDropdown,
  Container,
} from "react-bootstrap"

function storageAvailable(type) {
  var storage
  try {
    storage = window[type]
    var x = "__storage_test__"
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === "QuotaExceededError" ||
        // Firefox
        e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    )
  }
}

const CustomNavbar = ({ pageInfo }) => {
  let userData = {}
  const [user, setUser] = useLocalStorage("user", false)
  // useEffect(() => {
  //   if (storageAvailable("localStorage")) {
  //     console.log(JSON.parse(window.localStorage.getItem("user")))
  //     userData = JSON.parse(window.localStorage.getItem("user"))
  //     setUser(userData)
  //   } else {
  //     // 'You need localStorage support to login'
  //   }
  // }, [userData])
  // console.log(pageInfo)
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
                    {user !== {} ? (
                      <a href="/members/profile">{user.username}</a>
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
