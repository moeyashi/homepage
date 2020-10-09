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
              postsId
              category {
                name_for_url
              }
            }
          }
        }
        allMicrocmsCategories {
          edges {
            node {
              categoriesId
              name_for_url
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
      path: `/blog/posts/${post.node.postsId}`,
      component: path.resolve('./src/components/templates/blog.tsx'),
      context: {
        id: post.node.postsId,
      },
    });
  });
  result.data.allMicrocmsCategories.edges.forEach((category) => {
    createPage({
      path: `/blog/categories/${category.node.name_for_url}`,
      component: path.resolve('./src/components/templates/category.tsx'),
      context: {
        id: category.node.categoriesId,
      },
    });
  });
};
