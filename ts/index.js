"use strict";
function getUser(url) {
    const user = fetch(url);
    console.log(user);
}
getUser("http://localhost:3000/users");
