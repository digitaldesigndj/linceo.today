import React from "react"
import { graphql } from "gatsby"

export default function Home({ data }) {
  console.log(data)
  // const { page } = data.edges[0].node
  return (
    <div>
      <h1>Welcome to Linceo.Today</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export const query = graphql`
  query {
    allStrapiPage {
      edges {
        node {
          id
          Slug
          Title
        }
      }
    }
    strapiGlobal {
      LinceoBirthday
    }
  }
`
