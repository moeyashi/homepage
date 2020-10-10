import React, { FC } from "react"
import { Breadcrumbs as MUIBreadcrumbs, Typography } from "@material-ui/core"
import { Link } from "gatsby-material-ui-components"
import type { BreadcrumbsProps as MUIBreadcrumbsProps } from "@material-ui/core"

export type BreadcrumbsProps = MUIBreadcrumbsProps & {
  items: {
    text: string;
    to?: string;
  }[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ items }) => {
  const lastIdx = items.length - 1
  return (
    <MUIBreadcrumbs separator=">" aria-label="breadcrumb">
      {items.map((item, idx) => !!item.to && idx !== lastIdx
        ? (
          <Link key={`Breadcrumbs-${idx}`} to={item.to} color="inherit">
              {item.text}
          </Link>
        )
        : <Typography key={`Breadcrumbs-${idx}`} color={idx !== lastIdx ? "inherit" : "textPrimary"}>{item.text}</Typography>
      )}
    </MUIBreadcrumbs>
  )
}