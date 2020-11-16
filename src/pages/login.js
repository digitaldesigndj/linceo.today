import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Layout from "src/components/layout"
import SEO from "src/components/seo"

const LoginPage = ({ data }) => {
  return (
    <Layout pageInfo={{ pageName: "login" }}>
      <SEO title="Home" keywords={["Linceo", "Young"]} />
      <Container className="">
        <Row>
          <Col>
            <a href="https://admin.linceo.today/connect/google">
              Login with Google
            </a>
            {/* <pre>{JSON.stringify(data, null,2)}</pre> */}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default LoginPage
