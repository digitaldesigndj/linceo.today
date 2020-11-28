import React, { useContext } from "react"
import { store } from "src/store"
import SEO from "src/components/seo"
import { navigate } from "gatsby"
import useIsClient from "src/hooks/use-is-client"

const Logout = () => {
  const { isClient, key } = useIsClient()
  const sessionMachine = useContext(store)
  const { state, send } = sessionMachine
  if (isClient) {
    window.localStorage.clear()
    send("LOGOUT")
    setTimeout(() => {
      navigate("/")
    }, 500)
  }
  return (
    <>
      <SEO title="Logout" />
      <div className="p-5">
        <h1>Goodbye!</h1>
        <p>See you next time.</p>
      </div>
    </>
  )
}

export default Logout
