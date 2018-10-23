import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "./components/views/Login"
import Home from "./components/views/Home"
import Message from "./components/views/Message"
import Search from "./components/views/Search"
import Profile from "./components/views/Profile"

export default <Switch>
    <Route exact path="/" componenet={Login} />
    <Route path="/home" componenet={Home} />
    <Route path="/message" componenet={Message} />
    <Route path="/search" componenet={Search} />
    <Route path="/profile" componenet={Profile} />
    <Route path="/user/:userid" componenet={Profile} />
</Switch>