import React from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"
import { graphql } from "gatsby";
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const sep = new Date(data.strapiGlobal.LinceoBirthday);
  const today = new Date();
  const offset = today - sep
  const diffDay = Math.floor(offset / (1000 * 60 * 60 * 24));
  const diffWeek = Math.floor(offset / (1000 * 60 * 60 * 24 * 7));
  const diffYear = Math.floor(offset / (1000 * 60 * 60 * 24 * 365.25));
  return (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={["Linceo", "Young"]} />
    <Container className="">
      <Row>
        <Col>
          <p>
            This is a very nice website for Linceo!
          </p>
          <ul>
            <li>Linceo is {diffYear} years old!</li>
            <li>Linceo is {diffWeek} weeks old!</li>
            <li>Linceo is {diffDay} days old!</li>
          </ul>
          {/* <pre>{JSON.stringify(data, null,2)}</pre> */}
        </Col>
      </Row>
    </Container>
  </Layout>
)}

export default IndexPage

export const query = graphql`
  query {
    strapiGlobal {
      id
      LinceoBirthday
    }
  }`;