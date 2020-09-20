import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { Posts } from "../components/organisms/posts"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Posts />
  </Layout>
)

export default IndexPage
