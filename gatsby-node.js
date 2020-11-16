const path = require(`path`)

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/members/)) {
    page.matchPath = "/members/*"
    // Update the page.
    createPage(page)
  }
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const result = await graphql(`
    {
      strapiPages: allStrapiPage {
        edges {
          node {
            Title
            Slug
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // exports.onPreInit = () => {
  //   console.log('Gatsby-source-strapi-fix...')
  // }

  // result.data.strapiPages.edges.forEach(({ node }) => {
  //   const TemplateName = node.Template;
  //   console.log( TemplateName, 'TemplateName')
  //   createPage({
  //     path: `/${node.Slug}`,
  //     component: path.resolve(`src/templates/${TemplateName.replace(/_/g, '-')}.js`),
  //     context: { Slug: node.Slug }
  //   });
  // });

  result.data.strapiPages.edges.forEach(({ node }) => {
    createPage({
      path: `${node.Slug}`,
      component: path.resolve(`src/templates/page.js`),
      context: { Slug: node.Slug },
    })
  })
}

// pm2 start npm --name "admin.linceo.today-develop" -- run develop
