/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FC } from "react"
import { Container } from "@material-ui/core"

import Header from "./header"
import "./layout.css"
import { Footer } from "./Footer"

export const Layout: FC = ({ children }) => {

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <Container style={{ marginBottom: "2em" }}>
        <main>{children}</main>
      </Container>
      <div style={{
        marginTop: `auto`
      }}>
        <Footer />
      </div>
    </div>
  )
}

export default Layout
