import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout pageInfo={{ pageName: "Gallery", slug: "gallery" }}>
    <SEO title="Gallery" />
    <h1>Gallery</h1>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
