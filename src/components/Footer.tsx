import React, { FC } from "react";
import { AppBar, Container, Grid, Toolbar, Typography } from "@material-ui/core";
import { useStaticQuery, graphql } from "gatsby";
import { Link } from "gatsby-material-ui-components"
import type { FooterQuery } from "../../types/graphql-types";

export const Footer: FC = () => {
  const data: FooterQuery = useStaticQuery(graphql`
    query Footer {
      site {
        siteMetadata {
          title
          author
        }
      }
      allMicrocmsCategories {
        edges {
          node {
            name
            name_for_url
          }
        }
      }
    }
  `)

  return (
    <AppBar color="secondary" position="relative" elevation={0}>
      <Container>
        <Toolbar variant="dense" disableGutters>
          <Grid container style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
            <Grid item xs={12} style={{ marginBottom: 16 }}>
              <Link to="/" variant="h4" color="inherit" style={{ display: "block" }}>
                {data.site?.siteMetadata?.title || "Title"}
              </Link>
            </Grid>
            <Grid item xs={12} style={{ marginBottom: 8 }}>
              <Link to="/" variant="h6" color="inherit" style={{ display: "block" }}>記事一覧</Link>
            </Grid>
            {data.allMicrocmsCategories.edges.map(edge => (
              <Grid key={edge.node.name_for_url} item xs={12}>
                <Link to={`/blog/categories/${edge.node.name_for_url}`} variant="body1" color="inherit" style={{ display: "block", paddingLeft: 16, paddingTop: 4, paddingBottom: 4 }}>{edge.node.name}</Link>
              </Grid>
            ))}
            <Grid item xs={12} style={{ paddingTop: "2rem" }}>
              <Typography align="center">© 2020 {data.site?.siteMetadata?.author || 'ren adachi'}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  )
}