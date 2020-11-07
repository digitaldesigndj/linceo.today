module.exports = {
  pathPrefix: "/gatsby-react-bootstrap-starter",
  siteMetadata: {
    title: `Gatsby React Bootstrap Starter`,
    description: `A starter that includes react-bootstrap and react-icons, along with SASS compilation.`,
    author: `Billy Jacoby`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: "https://admin.linceo.today",
        queryLimit: 1000, // Default to 100
        contentTypes: ["page"],
        //If using single types place them in this array.
        singleTypes: ["global"],
        // Possibility to login with a strapi user, when content types are not publically available (optional).
        // loginData: {
        //   identifier: "gatsby",
        //   password: "goodpassword",
        // },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-react-bootstrap`,
        short_name: `react-bootstrap`,
        start_url: `/`,
        background_color: `#20232a`,
        theme_color: `#20232a`,
        display: `minimal-ui`,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
