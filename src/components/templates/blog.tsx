/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { createElement, FC } from "react"
import Helmet from "react-helmet"
import { graphql } from "gatsby"
import unified, { Plugin } from "unified"
import type { Element } from "hast"
import parse from "rehype-parse"
import rehype2react from "rehype-react"
import visit from "unist-util-visit"

import Layout from "../layout"

const addDataToTwitterWidget: Plugin = () => {
  return function(tree) {
    visit(tree, "element", function(node: Element) {
      if ((node.properties.className as string[])?.includes("twitter-timeline")) {
        node.properties["data-height"] = "450"
      }
    })
  }
}

const Script: FC<any> = (props) => {
  return (
    <Helmet><script {...props} /></Helmet>
  )
}

const processor = unified()
  .use(parse, { fragment: true })
  .use(addDataToTwitterWidget)
  .use(rehype2react, { createElement, components: { script: Script } })

const Blog = ({ data: { microcmsPosts: post } }) => {

  return (
    <Layout>
      <div>
        <h2>{post.title}</h2>
        <div>{processor.processSync(post.body).result}</div>
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