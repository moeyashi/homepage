import { AppBar, Container, Toolbar, Typography } from "@material-ui/core"
import { Link } from "../components/atoms/Link"
import React, { FC } from "react"

export const Header: FC<{ siteTitle: string }> = ({ siteTitle = "" }) => (
  <AppBar position="relative">
    <Container>
      <Toolbar variant="dense" disableGutters>
        <Link to="/" color="inherit"><Typography component="h1" variant="h6" color="inherit">
          {siteTitle}
        </Typography></Link>
      </Toolbar>
    </Container>
  </AppBar>
)

export default Header
