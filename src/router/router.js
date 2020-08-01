import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import CreateRoom from '../screen/CreateRoom';
import JoinRoom from '../screen/JoinRoom';
import Rooms from '../screen/rooms/Rooms';
import AppLoading from '../screen/AppLoading';

export const Root = () => {
    return(
        <Router>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/" component={AppLoading}></Route>
                <Route path="/rooms/create" component={CreateRoom}></Route>
                <Route path="/rooms/join" component={JoinRoom}></Route>
                <Route path="/rooms" component={Rooms}></Route>
            </Switch>
        </Router>
    )
}