import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = ({ data }) => (
  <Layout pageInfo={{ pageName: "Gallery", slug: "gallery" }}>
    <SEO title="Gallery" />
    <h1>Gallery</h1>
    <Row className="gallery" noGutters>
    {data.allFile.edges.map( (image, idx) => {
      return (<Col xs={6} sm ={4} md={3} lg={2}><img src={`/LinceoSelect/${image.node.name}${image.node.ext}`} alt="" /></Col>)
    })}
    </Row>
    {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
      edges {
        node {
          name
          ext
        }
      }
    }
  }
`