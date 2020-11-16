import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import useLocalStorage from "src/hooks/useLocalStorage"

const Logout = ({ data }) => {
  const [session, setSession] = useLocalStorage()
  setSession(false)
  let text = "Logging you out&hellip;"
  return (
    <Layout pageInfo={{ pageName: "login" }}>
      <SEO title="Home" keywords={["Linceo", "Young"]} />
      <Container className="">
        <Row>
          <Col>
            {text}
            {/* <pre>{JSON.stringify(data, null,2)}</pre> */}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Logout
