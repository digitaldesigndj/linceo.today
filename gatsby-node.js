const path = require(`path`)

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
