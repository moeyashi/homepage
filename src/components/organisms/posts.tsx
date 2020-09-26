import React, { FC } from "react";
import { useStaticQuery, graphql, Link } from "gatsby"
import { Card, CardContent, CardHeader, CardMedia, Divider, Grid, Typography } from "@material-ui/core";
import { MicrocmsPosts, PostsQueryQuery } from "../../../types/graphql-types"

export type PostCardProps = {
  id: string;
  title: string;
  body: string;
  category?: string;
  categoryImageURL?: string;  
  tagnames?: string[];
}

export const PostCard: FC<PostCardProps> = ({
  id,
  title,
  body,
  category,
  categoryImageURL,
  tagnames,
}) => (
  <Card>
    <CardMedia component="picture" style={{ height: 120 }}>
      <source srcSet={`${categoryImageURL}?h=120&fm=webp`} type="image/webp" />
      <img src={`${categoryImageURL}?h=120`} alt="post category image" />
    </CardMedia>
    <CardContent>
      <Typography variant="caption" style={{ marginBottom: 8 }}>{category} {tagnames.join(",")}</Typography>
      <Typography variant="h3" style={{ marginBottom: 8, height: "2.334em", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{title}</Typography>
      <Typography noWrap>{body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}</Typography>
    </CardContent>
  </Card>
)

export const Posts: FC = () => {
  const data: PostsQueryQuery = useStaticQuery(graphql`
    query PostsQuery {
      allMicrocmsPosts(sort: {fields: publishedAt, order: DESC}) {
        edges {
          node {
            id
            title
            body
            category {
              name
              image {
                url
              }
            }
            tags {
              name
              id
            }
          }
        }
      }
    }
  `)

  return (
    <div>
      <Typography variant="h2">記事一覧</Typography>
      <Grid container spacing={2}>
        {data.allMicrocmsPosts.edges.map(edge => (
          <Grid item key={edge.node.id} xs={12} md={4}>
            <Link to={`/blog/${edge.node.id}`} style={{ textDecoration: "none" }}>
              <PostCard
                id={edge.node.id}
                title={edge.node.title}
                body={edge.node.body}
                category={edge.node.category.name}
                categoryImageURL={edge.node.category.image?.url}
                tagnames={edge.node.tags.map(tag => tag.name)}
              />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  )

}
