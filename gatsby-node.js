/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMicrocmsPosts(sort: { fields: [publishedAt], order: DESC }) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    throw result.errors;
  }

  result.data.allMicrocmsPosts.edges.forEach((post, index) => {
    createPage({
      path: `/blog/${post.node.id}`,
      component: path.resolve('./src/components/templates/blog.tsx'),
      context: {
        id: post.node.id,
      },
    });
  });
};
