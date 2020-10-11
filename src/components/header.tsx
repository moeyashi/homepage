import { AppBar, Box, Container, Toolbar, Typography } from "@material-ui/core"
import { Link } from "gatsby-material-ui-components"
import React, { FC } from "react"
import { graphql, useStaticQuery } from "gatsby"
import nprogress from "nprogress"
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
            <Link to="/" color="inherit" underline="none" onClick={nprogress.start}>
                {data.site?.siteMetadata?.title || 'Title'}
            </Link>
          </Typography>
          <Box ml={2}>
            <Link to="/" color="inherit" underline="none" onClick={nprogress.start}>ブログ</Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
