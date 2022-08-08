# JWT seamless authentication with refresh token rotation :lock:

JWT seamless authentication system demonstration using access token and `refresh token rotation` strategy. <br/>
This demonstration uses refresh token to re-authenticate user without asking for login details again and again. <br/>
It improves UX and refreshing authentication token makes the system more **secure**.

When a user signup or login into the system the authentication handler generate two token and stores them in **HTTPOnly Cookie** storage for secure access. User requests protected routes and the authentication server authenticates the user and provide access to thr requested route. <br/>
Access token has maxAge of only `5 minutes`. If a user requests using an expired access token, the authentication server uses the refresh token to generate a new pair of access and refresh token and gives access to the requested route.
<br/> <br/>

![JWT authentication journey](/public/images/jwt_auth_flow.jpg)

## Why another refresh token demonstration ?

some do not show the usage of refresh token - some do use refresh token but not refresh token rotation - some

### Why JWT? :point_up:

According to [auth0.com](https://auth0.com/docs/secure/tokens/json-web-tokens), WTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with. <br/>
Moreover, JWT allows us to carry on autentication without storing information on the server or in database.

### Introducing refresh token :key:

### Just refresh token is not enough - Refresh token rotation! :arrows_clockwise:

### Defeating hackers :imp:

how it stops hacker - how to devalidate refresh token - logout - logout all
