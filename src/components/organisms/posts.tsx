import React, { FC } from "react";
import { useStaticQuery, graphql, Link } from "gatsby"

export const Posts: FC = () => {
  const data = useStaticQuery(graphql`
    query PostsQuery {
      allMicrocmsPosts(sort: {fields: publishedAt, order: DESC}) {
        edges {
          node {
            id
            title
            tag {
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
      <h2>記事一覧</h2>
      <ul>
        {data.allMicrocmsPosts.edges.map(edge => (
          <li key={edge.node.id}><Link to={`/blog/${edge.node.id}`}>{edge.node.title}</Link></li>
        ))}
      </ul>
    </div>
  )

}