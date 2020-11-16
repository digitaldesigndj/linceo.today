import React from "react"
import { Router } from "@reach/router"
import Layout from "src/components/layout"
import Profile from "src/components/profile"

const Members = () => (
  <Layout>
    <Router>
      <Profile path="/members/profile" />
    </Router>
  </Layout>
)
export default Members
