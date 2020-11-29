import React, { useContext } from "react"
import { store } from "src/store"
import { useLocation } from "@reach/router"
import { navigate } from "gatsby"
import useIsClient from "src/hooks/use-is-client"

const GATSBY_APP_BACKEND_URL =
  process.env.GATSBY_APP_BACKEND_URL || "http://localhost:1337"

const Redirect = ({ providerName }) => {
  const { isClient } = useIsClient()
  const sessionMachine = useContext(store)
  let { state, send } = sessionMachine
  console.log(sessionMachine, "sessionMachine")
  const location = useLocation()
  const loginURL = `${GATSBY_APP_BACKEND_URL}/auth/${providerName}/callback${location.search}`
  console.log("LOGIN", loginURL)
  if (isClient) {
    send({ type: "LOGIN", loginURL: loginURL })
    if (state.value === "active") {
      setTimeout(() => {
        navigate("/")
      }, 500)
    }
  } else {
    state = { value: "inactive" }
  }
  return (
    <div className="p-5">
      {state.value !== "active" && <p>Loading...</p>}
      {state.value === "active" && <p>Redirecting...</p>}
    </div>
  )
}

export default Redirect
