import React, { useContext } from "react"
import SEO from "src/components/seo"
import { useMachine } from "@xstate/react"
import fetchMachineFactory from "src/machines/fetch"
const GATSBY_APP_BACKEND_URL =
  process.env.GATSBY_APP_BACKEND_URL || "http://localhost:1337"

const Logout = () => {
  const [fetchState] = useMachine(
    fetchMachineFactory(
      `${GATSBY_APP_BACKEND_URL}/users-permissions/providers`,
      {}
    )
  )
  return (
    <>
      <SEO title="Login" />
      <div className="p-5">
        <h1>Welcome!</h1>
        <p>
          Please choose a provider, each provider will be/create a unique
          profile.
        </p>
        <ul>
          {fetchState.value === "ready" ? (
            Object.keys(fetchState.context.response).map((key, index) => {
              const provider = fetchState.context.response[key]
              if (!provider.enabled) return null
              return (
                <li>
                  <a href={`${GATSBY_APP_BACKEND_URL}/connect/${key}`}>{key}</a>
                </li>
              )
            })
          ) : (
            <li>Loading...</li>
          )}
        </ul>
        <p>
          This way you can create an account, but never have to provide me a
          password. This is just for playing some video poker! When you sign up,
          you start playing poker from the server, this means that you can't
          cheat the system. You will be able to participate in leaderboards and
          other stuff if I get around to building it.
        </p>
        <p>
          Also, I am not going to send you any email, no passwords, no password
          recovery. Your email will never be shown publicly.
        </p>
        {/* Add user handle feature */}
      </div>
    </>
  )
}

export default Logout
