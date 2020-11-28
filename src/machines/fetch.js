import { Machine, assign } from "xstate"

const doFetch = (loginURL, options) => {
  console.log("DO FeTCH")
  return fetch(loginURL, options)
    .then(res => {
      console.log(res.status, "RESPONSE")
      if (res.status !== 200) {
        throw new Error(
          `Couldn't talk to the Strapi API. Status: ${res.status}`
        )
      }
      return res
    })
    .then(response => response.json())
}

const fetchMachineFactory = (url, options) =>
  Machine(
    {
      id: "fetchMachine",
      initial: "loading",
      context: {
        url,
        options: options || {},
        response: null,
        error: null,
      },
      states: {
        loading: {
          invoke: {
            id: "doFetch",
            src: (context, event) => doFetch(context.url, context.options),
            onDone: {
              target: "ready",
              actions: assign({
                response: (context, event) => event.data,
              }),
            },
            onError: {
              target: "error",
              actions: [
                assign({ error: (context, event) => event.data.message }),
                (context, event) => {
                  console.log("BIG FAIL", context, event)
                },
              ],
            },
          },
        },
        ready: {},
        error: {},
      },
    },
    {
      actions: {},
    }
  )

export default fetchMachineFactory
