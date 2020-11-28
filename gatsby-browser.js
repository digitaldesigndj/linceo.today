/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import "./src/styles/style.scss"
import React from "react"
import { XStateProvider } from "src/store"

export const wrapRootElement = ({ element }) => {
  return <XStateProvider>{element}</XStateProvider>
}
