import { Machine, assign } from "xstate"

const fetchStrapiLogin = loginURL => {
  return fetch(loginURL)
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`Couldn't login to Strapi API. Status: ${res.status}`)
      }
      return res
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
      // setText("An error occurred, please see the developer console.")
    })
}

const sessionMachineFactory = (loginURL, token, user) =>
  Machine(
    {
      id: "userSession",
      initial: "static",
      context: {
        loginURL: loginURL || null,
        user: user || null,
        token: token || null,
        error: null,
      },
      states: {
        static: {
          always: [
            {
              target: "tryLogin",
              cond: "hasLoginURL",
            },
            {
              target: "active",
              cond: "hasToken",
            },
            { target: "inactive" },
          ],
        },
        inactive: {
          on: {
            LOGIN: {
              target: "tryLogin",
              actions: assign({
                loginURL: (context, event) => event.loginURL,
              }),
            },
          },
          // on: { LOGIN: "tryLogin" },
        },
        tryLogin: {
          invoke: {
            id: "fetchStrapiLogin",
            src: (context, event) => fetchStrapiLogin(context.loginURL),
            onDone: {
              target: "active",
              actions: [
                (context, event) => {
                  console.log("STrapi Login", event)
                  localStorage.setItem("user", JSON.stringify(event.data.user))
                  localStorage.setItem("token", event.data.jwt)
                },
                assign({
                  user: (context, event) => event.data.user,
                  token: (context, event) => event.data.jwt,
                }),
              ],
            },
            onError: {
              target: "loginFailure",
            },
          },
        },
        active: {
          on: {
            LOGOUT: {
              target: "inactive",
              actions: assign({
                loginURL: null,
                user: null,
                token: null,
                error: null,
              }),
            },
          },
        },
        loginFailure: {},
      },
    },
    {
      guards: {
        hasToken: (context, event) => context.token !== null,
        hasLoginURL: (context, event) => context.loginURL !== null,
        hasUser: (context, event) => context.user !== null,
      },
    }
  )

export default sessionMachineFactory
