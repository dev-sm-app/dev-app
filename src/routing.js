import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "./components/views/Login"
import Home from "./components/views/Home"
import Messages from "./components/views/Messages"
import Search from "./components/views/Search"
import Profile from "./components/views/Profile"
import OtherUsers from "./components/views/OtherUsers"

export default <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/messages" component={Messages} />
    <Route path="/search" component={Search} />
    <Route path="/profile" component={Profile} />
    <Route path="/user/:userid" component={OtherUsers} />
</Switch>