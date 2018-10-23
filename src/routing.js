import React from "react"
import { Route, Switch } from "react-router-dom"

import Login from "./components/views/Login"
import Home from "./components/views/Home"
import Message from "./components/views/Message"
import Search from "./components/views/Search"
import Profile from "./components/views/Profile"

export default <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/message" component={Message} />
    <Route path="/search" component={Search} />
    <Route path="/profile" component={Profile} />
    <Route path="/user/:userid" component={Profile} />
</Switch>