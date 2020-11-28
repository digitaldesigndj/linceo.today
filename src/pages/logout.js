import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Layout from "src/components/layout"
import SEO from "src/components/seo"
import useLocalStorage from "src/hooks/useLocalStorage"
import { useLocation, useNavigate } from "@reach/router"

const Logout = ({ data }) => {
  const navigate = useNavigate()
  const [session, setSession] = useLocalStorage()
  setTimeout(() => {
    setSession(false)
    window.localStorage.clear()
    navigate("/", { replace: true })
  }, 500)
  let text = "Logging you out…"
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
