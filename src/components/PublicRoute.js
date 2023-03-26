import React from "react";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({ loggedIn, children }) {
    return (
        <Route>
            {
                () => loggedIn === false ? children : <Redirect to="/movies" />
            }
        </Route>

    )
}

export default PublicRoute