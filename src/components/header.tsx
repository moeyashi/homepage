import { AppBar, Container, Toolbar, Typography } from "@material-ui/core"
import { Link } from "../components/atoms/Link"
import React, { FC } from "react"
import { graphql, useStaticQuery } from "gatsby"
import type { HeaderQuery } from "../../types/graphql-types"

export const Header: FC = () => {
  const data: HeaderQuery = useStaticQuery(graphql`
    query Header {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <AppBar position="relative" elevation={0}>
      <Container>
        <Toolbar variant="dense" disableGutters>
          <Typography component="h1" variant="h6">
            <Link to="/" color="inherit" variant="inherit">
                {data.site?.siteMetadata?.title || 'Title'}
            </Link>
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
