import React, { FC } from "react";
import { AppBar, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import type { FooterQuery } from "../../types/graphql-types";
import { Link } from "./atoms/Link";

export const Footer: FC = () => {
  const data: FooterQuery = useStaticQuery(graphql`
    query Footer {
      site {
        siteMetadata {
          title
          author
        }
      }
    }
  `)

  return (
    <AppBar color="secondary" position="relative" elevation={0}>
      <Container>
        <Toolbar variant="dense" disableGutters>
          <Grid container style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
            <Grid item xs={12}>
              <Typography component="div" variant="h6">
                <Link to="/" variant="inherit" color="inherit">
                  {data.site?.siteMetadata?.title || "Title"}
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography><Link to="/" variant="inherit" color="inherit">記事一覧</Link></Typography>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "2rem" }}>
              <Typography align="center">© 2020 {data.site?.siteMetadata?.author || 'ren adachi'}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}