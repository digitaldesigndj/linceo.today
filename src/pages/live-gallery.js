import React, { useEffect } from "react"
import { Link } from "gatsby"
// import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
// import LivePhoto from "src/components/livePhoto"
import * as LivePhotosKit from "livephotoskit"
import Masonry from "react-masonry-component"
import { node } from "prop-types"

import { Row, Col, Container } from "react-bootstrap"

// console.log(LivePhotosKit)

const masonryOptions = {
  transitionDuration: 0,
  // horizontalOrder: true,
  columnWidth: ".grid-sizer",
  itemSelector: ".grid-item",
}

const LivePhoto = props => {
  const { name } = props
  let livePhoto = React.createRef()
  useEffect(() => {
    new LivePhotosKit.Player(livePhoto.current, {
      photoSrc: `/livephotos/${name}.jpg`,
      videoSrc: `/livephotos/${name}_720p.mov`,
    })
  })
  return <div {...props} ref={livePhoto}></div>
}

const LiveGallery = ({ children }) => (
  <Masonry options={masonryOptions} disableImagesLoaded={true}>
    <div className="grid-sizer" />
    {children}
  </Masonry>
)

const GalleryPage = ({ data }) => {
  const images = data.allFile.edges.map(image => image.node.name)
  return (
    <Layout pageInfo={{ pageName: "Gallery", slug: "gallery" }}>
      <SEO title="Gallery" />
      <h1>Live Gallery</h1>
      {/* <LiveGallery></LiveGallery> */}
      <Container className="">
        <Row>
          {images.map((name, key) => (
            <LivePhoto
              {...{ name, key }}
              className="grid-item live-photo col"
            />
          ))}
        </Row>
      </Container>
      {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default GalleryPage

export const query = graphql`
  query MyQuery {
    allFile(
      filter: {
        sourceInstanceName: { eq: "livephotos" }
        extension: { eq: "jpg" }
      }
    ) {
      edges {
        node {
          name
        }
      }
    }
  }
`
