import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

import Masonry from 'react-masonry-component';

const masonryOptions = {
    transitionDuration: 0,
    // horizontalOrder: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item'
};

// const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {
    render() {
        const childElements = this.props.data.map(function(image, idx){
          console.log( image.node.childImageSharp.sizes.aspectRatio )
          const imageNumber = parseInt(image.node.name.replace('Linceo-Select-',''))
          if( image.node.childImageSharp.sizes.aspectRatio > 1 || [10,12,18,26,35,38,41,45,48,53].includes(imageNumber) ) {
            return ( <Image className="grid-item grid-item--width2" key={idx} fluid={image.node.childImageSharp.double} />);
          }
          return ( <Image className="grid-item" key={idx} fluid={image.node.childImageSharp.single} />);
        });
        return (
            <Masonry
                className={''} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions}
                disableImagesLoaded={true} // default false
                // updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                // imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
              <div className="grid-sizer" />
              {childElements}
            </Masonry>
        );
    }
}

const GalleryPage = ({ data }) => {
  const images = data.allFile.edges.sort( (a, b) => {
    return parseInt(a.node.name.replace('Linceo-Select-','')) - parseInt(b.node.name.replace('Linceo-Select-',''))
  })
  return (
  <Layout pageInfo={{ pageName: "Gallery", slug: "gallery" }}>
    <SEO title="Gallery" />
    <h1>Gallery</h1>
    <Gallery data={images} />
    {/* <pre>{JSON.stringify(data,null,2)}</pre> */}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)}

export default GalleryPage

export const query = graphql`
  query {
    allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
      edges {
        node {
          name
          ext
          childImageSharp {
            single: fluid(maxWidth: 200, quality: 95) {
              ...GatsbyImageSharpFluid
            }
            double: fluid(maxWidth: 400, quality: 95) {
              ...GatsbyImageSharpFluid
            }
            sizes {
              aspectRatio
            }
          }
        }
      }
    }
  }
`