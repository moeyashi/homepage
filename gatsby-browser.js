/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import NProgress from "nprogress"
import "highlight.js/styles/github.css"
import "./src/browser.css"

export const onClientEntry = () => {
  NProgress.configure({ showSpinner: false })
}

export const onPreRouteUpdate = () => {
  NProgress.start()
}

export const onRouteUpdate = () => {
  NProgress.done()
}