import React, { FC } from "react"
import { Layout } from "../components/layout"
import { SEO } from "../components/seo"
import { PostCards } from "../components/organisms/posts"
import { graphql } from "gatsby"
import { Typography } from "@material-ui/core"
import { PostsQuery } from "../../types/graphql-types"

const IndexPage: FC<{ data: PostsQuery }> = ({ data }) => (
  <Layout>
    <SEO title="Home" lang="ja" />
    <Typography variant="h2">記事一覧</Typography>
    <PostCards posts={data.allMicrocmsPosts.edges} />
  </Layout>
)

export const query = graphql`
  query Posts {
    allMicrocmsPosts(sort: {fields: publishedAt, order: DESC}) {
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

export default IndexPage
