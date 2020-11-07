import React from "react"
// import { Row, Col, Container } from "react-bootstrap"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default function Home({ data }) {
  const page = data.strapiPage
  return (
    <Layout pageInfo={{ pageName: "index" }}>
      <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
      <h1>{page.Title}</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export const query = graphql`
  query($Slug: String!) {
    strapiPage(Slug: { eq: $Slug }) {
      id
      Slug
      Title
    }
  }
`
