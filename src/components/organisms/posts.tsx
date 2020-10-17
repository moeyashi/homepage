import React, { FC } from "react";
import nprogress from "nprogress"
import { Link } from "gatsby"
import { Card, CardContent, CardMedia, createStyles, Grid, makeStyles, Tooltip, Typography, useMediaQuery } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

export type PostCardProps = {
  id: string;
  title: string;
  body: string;
  category?: string;
  categoryImageURL?: string;  
  categoryImageBackgroundColor?: string;
  tagnames?: string[];
}

const useClasses = makeStyles((theme) => createStyles({
  root: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      height: 104
    }
  },
  media: {
    display: "flex",
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "20%",
      height: 104
    }
  },
  img: {
    [theme.breakpoints.down("xs")]: {
      height: 40
    }
  },
  content: {
    [theme.breakpoints.down("xs")]: {
      width: "80%",
      "&:last-child": {
        paddingBottom: 16
      }
    }
  }
}))

export const PostCard: FC<PostCardProps> = ({
  id,
  title,
  body,
  category,
  categoryImageURL,
  categoryImageBackgroundColor = "#19857b",
  tagnames,
}) => {
  const classes = useClasses()
  const theme = useTheme()
  const isXs = useMediaQuery(theme.breakpoints.down("xs"))
  return (
    <Tooltip title={title}>
      <Card className={classes.root}>
        <CardMedia component="div" className={classes.media} style={{ backgroundColor: categoryImageBackgroundColor }}>
          <picture>
            <source srcSet={`${categoryImageURL}?h=80&fm=webp`} type="image/webp" />
            <img src={`${categoryImageURL}?h=80`} alt="post category image" className={classes.img} />
          </picture>
        </CardMedia>
        <CardContent className={classes.content}>
          <Typography variant="caption" noWrap style={{ marginBottom: 8 }}>{category} {tagnames.join(",")}</Typography>
          <Typography variant="h3" style={{ marginBottom: 8, height: "2.334em", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }}>{title}</Typography>
          {!isXs && <Typography noWrap>{body.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'')}</Typography>}
        </CardContent>
      </Card>
    </Tooltip>
  )
}

export type PostCardsProps = {
  posts: {
    node?: {
      postsId: string;
      title: string;
      body: string;
      category?: {
        name: string;
        image?: {
          url: string;
        }
        image_bg_color: string;
      }
      tags?: {
        name: string;
      }[]
    }
  }[]
}

export const PostCards: FC<PostCardsProps> = ({ posts }) => (
  <Grid container spacing={2}>
    {posts.map(edge => (
      <Grid item key={edge.node.postsId} xs={12} md={4}>
        <Link to={`/blog/posts/${edge.node.postsId}`} onClick={nprogress.start} style={{ textDecoration: "none" }}>
          <PostCard
            id={edge.node.postsId}
            title={edge.node.title}
            body={edge.node.body}
            category={edge.node.category.name}
            categoryImageURL={edge.node.category.image?.url}
            categoryImageBackgroundColor={edge.node.category?.image_bg_color}
            tagnames={edge.node.tags.map(tag => tag.name)}
          />
        </Link>
      </Grid>
    ))}
  </Grid>
)
