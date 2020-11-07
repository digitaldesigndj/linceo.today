import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

const SecondPage = ({ data }) => {
  const images = data.allFile.edges.sort( (a, b) => {
    return parseInt(a.node.name.replace('Linceo-Select-','')) - parseInt(b.node.name.replace('Linceo-Select-',''))
  })
  return (
  <Layout pageInfo={{ pageName: "Gallery", slug: "gallery" }}>
    <SEO title="Gallery" />
    <h1>Gallery</h1>
    <Row className="gallery" noGutters>
    {images.map( (image, idx) => {
      return (<Col xs={6} sm ={4} md={3} lg={2}>
        <Image fluid={image.node.childImageSharp.fluid} />
        {/* <img src={`/LinceoSelect/${image.node.name}${image.node.ext}`} alt="" /> */}
        </Col>)
    })}
    </Row>
    {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)}

export default SecondPage

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
      edges {
        node {
          name
          ext
          childImageSharp {
            fluid(maxWidth: 180, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`