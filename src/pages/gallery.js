import React from "react"
import { Link } from "gatsby"
import { graphql } from "gatsby"
import { Row, Col } from "react-bootstrap"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

import Masonry from 'react-masonry-component';

const masonryOptions = {
    // transitionDuration: 0,
    columnWidth: 180,
    // horizontalOrder: true,
    itemSelector: '.grid-item'
};

// const imagesLoadedOptions = { background: '.my-bg-image-el' }

class Gallery extends React.Component {
    render() {
        const childElements = this.props.data.map(function(image, idx){
          console.log( image.node.childImageSharp.sizes.aspectRatio )
          const imageNumber = parseInt(image.node.name.replace('Linceo-Select-',''))
          if( image.node.childImageSharp.sizes.aspectRatio > 1 || [12,45,10,38,18,35,53].includes(imageNumber) ) {
            return ( <Image className="grid-item grid-item--width2" key={idx} fixed={image.node.childImageSharp.double} />);
          }
          return ( <Image className="grid-item" key={idx} fixed={image.node.childImageSharp.single} />);
        });
        return (
            <Masonry
                className={'my-gallery-class'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={true} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                // imagesLoadedOptions={imagesLoadedOptions} // default {}
            >
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
      {/* {images.map( (image, idx) => {
        // if( image.node.childImageSharp.sizes.aspectRatio >= 1 ) {
        //   return (<Col xs={12} sm={8} md={6} lg={4}><Image fluid={image.node.childImageSharp.fluid} /></Col>)
        // }
        return (<Col className='grid-item'><Image fluid={image.node.childImageSharp.fluid} /></Col>)
      })} */}
    <Row className="gallery" noGutters></Row>
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
            single: fixed(width: 180, quality: 100) {
              ...GatsbyImageSharpFixed
            }
            double: fixed(width: 360, quality: 100) {
              ...GatsbyImageSharpFixed
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