/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import { graphql } from "gatsby"

import type { TagQuery } from "../../../types/graphql-types"
import { Layout } from "../layout"
import { SEO } from "../seo"
import { Typography } from "@material-ui/core"
import { PostCards } from "../organisms/posts"

const Category: FC<{ data: TagQuery; }> = ({ data: { allMicrocmsPosts: { edges: posts }, microcmsTags: { name } } }) => (
  <Layout>
    <SEO title={name} description={`${name}についての記事一覧`} lang="ja" />
    <Typography variant="h2">{name}</Typography>
    <PostCards posts={posts} />
  </Layout>
)

export default Category

export const query = graphql`
  query Tag($id: String!) {
    microcmsTags(tagsId: {eq: $id}) {
      name
    }
    allMicrocmsPosts(sort: {fields: publishedAt, order: DESC}, filter: {tags: {elemMatch: {id: {eq: $id}}}}) {
      edges {
        node {
          id
          postsId
          title
          body
          category {
            name
            image {
              url
            }
            image_bg_color
          }
          tags {
            name
            id
          }
        }
      }
    }
  }
`