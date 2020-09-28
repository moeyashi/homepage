/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "@material-ui/core"

import Header from "./header"
import type { LayoutQuery } from "../../types/graphql-types"
import "./layout.css"

export const Layout: FC = ({ children }) => {
  const data: LayoutQuery = useStaticQuery(graphql`
    query Layout {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata?.title || `Title`} />
      <Container>
        <main>{children}</main>
      </Container>
      <footer style={{
        marginTop: `2rem`
      }}>
        <Container>© 2020 ren adachi</Container>
      </footer>
    </>
  )
}

export default Layout
