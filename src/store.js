// store.js
import React, { createContext } from "react"
import sessionMachineFactory from "src/machines/session"
import { useMachine } from "@xstate/react"

const initialState = {}
const store = createContext(initialState)
const { Provider } = store

const XStateProvider = ({ children }) => {
  const storage = {
    token: window.localStorage.getItem("token"),
    user: JSON.parse(window.localStorage.getItem("user")),
    loginURL: window.localStorage.getItem("loginURL"),
  }
  const [state, send] = useMachine(
    sessionMachineFactory(storage.loginURL, storage.token, storage.user)
  )
  return <Provider value={{ state, send }}>{children}</Provider>
}

export { store, XStateProvider }
