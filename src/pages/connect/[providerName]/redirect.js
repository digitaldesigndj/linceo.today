import React, { useEffect, useState } from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"
import { graphql } from "gatsby"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import { useLocation, useNavigate } from "@reach/router"
import useLocalStorage from "src/hooks/useLocalStorage"

const Redirect = ({ providerName }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [text, setText] = useState("Loading...")
  const backendURL = process.env.GATSBY_APP_BACKEND_URL
  const loginURL = `${backendURL}/auth/${providerName}/callback${location.search}`
  useEffect(() => {
    // Successfully logged with the provider
    // Now logging with strapi by using the access_token (given by the provider) in props.location.search
    fetch(loginURL)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi API. Status: ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        window.localStorage.setItem("token", res.jwt)
        window.localStorage.setItem("user", JSON.stringify(res.user))
        setText(
          `Hi ${res.user.username} You have been successfully logged in. You will be redirected in a few seconds...`
        )
        // setTimeout(() => navigate("/members/profile", { replace: true }), 500) // Redirect
      })
      .catch(err => {
        console.log(err)
        setText("An error occurred, please see the developer console.")
      })
  }, [providerName, location.search])
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="OAuth2 " keywords={["Linceo", "Young"]} />
      <Container className="">
        <Row>
          <Col>
            <p>{text}</p>
            {/* <p>{backendURL}</p> */}
            {/* <pre>
              {JSON.stringify(session, null, 2)}
            </pre> */}
            {/* <pre>{JSON.stringify(location, null, 2)}</pre> */}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Redirect

// export const query = graphql`
//   query {
//     strapiGlobal {
//       # id
//       LinceoBirthday
//     }
//   }
// `
