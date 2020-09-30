/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { createElement, FC } from "react"
import { graphql } from "gatsby"
import unified, { Plugin } from "unified"
import type { Element } from "hast"
import rehype from "rehype-parse"
import hljs from "rehype-highlight"
import rehype2react from "rehype-react"
import visit from "unist-util-visit"

import type { BlogQuery } from "../../../types/graphql-types"
import { Layout } from "../layout"
import { SEO } from "../seo"
import { Box, Chip } from "@material-ui/core"

const addDataToTwitterWidget: Plugin = () => {
  return function(tree) {
    visit(tree, "element", function(node: Element) {
      if ((node.properties.className as string[])?.includes("twitter-timeline")) {
        node.properties["data-height"] = "350"
        node.properties["data-width"] = "250"
      }
    })
  }
}

const Script: FC = () => {
  return null
}

const processor = unified()
  .use(rehype, { fragment: true })
  .use(hljs, {
    subset: ["json", "typescript", "ts", "html", "css", "scss", "python", "py", "yml", "yaml", "bash", "sh"],
    aliases: {
      ts: "tsx"
    }
  })
  .use(addDataToTwitterWidget)
  .use(rehype2react, { createElement, components: { script: Script } })

const Blog: FC<{data: BlogQuery; }> = ({ data: { microcmsPosts: post } }) => {

  return (
    <Layout>
      <SEO title={post.title} description={post.body?.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')} lang="ja" />
      <div>
        <Box my={2}><Chip label={post.category?.name} color="secondary" /></Box>
        <h2>{post.title}</h2>
        <Box my={2}>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }}>
            {post.tags?.map(tag => <li key={tag.name} style={{ margin: 4 }}><Chip size="small" label={tag.name} /></li>)}
          </ul>
        </Box>
        <div><a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a></div>
        <div>{processor.processSync(post.body).result}</div>
        <div style={{ marginTop: "2rem" }}>
          <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
        </div>
      </div>
    </Layout>
  )
}

export default Blog

export const query = graphql`
 query Blog($id: String!) {
   microcmsPosts(id: { eq: $id }) {
     title
     body
     childHtmlRehype {
       htmlAst
     }
     category {
       name
     }
     tags {
       id
       name
     }
   }
 }
`