import React, { useEffect, useState } from "react"
import useLocalStorage from "src/hooks/useLocalStorage"
const backendURL = process.env.GATSBY_APP_BACKEND_URL

const Profile = () => {
  const [session, setSession] = useLocalStorage("session", false)
  // const [data, setData] = useState(false)
  const { username, email, provider } = session.user
  // useEffect(() => {
  //   // Successfully logged with the provider
  //   // Now logging with strapi by using the access_token (given by the provider) in props.location.search
  //   fetch(`${backendURL}/users/me`, {
  //     // method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${session.jwt}`,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(res => {
  //       if (res.status !== 200) {
  //         throw new Error(`Couldn't login to Strapi API. Status: ${res.status}`)
  //       }
  //       return res
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       setData(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //       // setText("An error occurred, please see the developer console.")
  //     })
  // }, [])

  return (
    <>
      <h1>Your profile</h1>
      <p>
        This is private and only you can see this stuff. Set a handle to be
        publicly visible.
      </p>
      <ul>
        <li>Username: {username}</li>
        <li>E-mail: {email}</li>
        <li>Provider: {provider}</li>
      </ul>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}
export default Profile
