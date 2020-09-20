/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { graphql } from "gatsby"

import Layout from "../layout"

const Blog = ({ data: { microcmsPosts: post } }) => {

  return (
    <Layout>
      <div>
        <h2>{post.title}</h2>
        <div
         dangerouslySetInnerHTML={{
           __html: `${post.body}`,
         }}
       ></div>
      </div>
    </Layout>
  )
}

export default Blog

export const query = graphql`
 query($id: String!) {
   microcmsPosts(id: { eq: $id }) {
     title
     body
   }
 }
`