/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
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
  ],
}
