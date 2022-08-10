# JWT seamless authentication with refresh token rotation :lock:

JWT seamless authentication system demonstration using access token and `refresh token rotation` strategy. <br/>
This demonstration uses refresh token to re-authenticate user without asking for login details again and again. <br/>
It improves UX and refreshing authentication token makes the system more **secure**.

When a user signup or login into the system the authentication handler generate two token and stores them in **HTTPOnly Cookie** storage for secure access. User requests protected routes and the authentication server authenticates the user and provide access to thr requested route. <br/>
Access token has maxAge of only `5 minutes`. If a user requests using an expired access token, the authentication server uses the refresh token to generate a new pair of access and refresh token and gives access to the requested route.
<br/> <br/>

![JWT authentication journey](/public/images/jwt_auth_flow.jpg)

### Table of Contents  
[Why another refresh token demonstration?](#why-another-refresh-token-demonstration-) <br/>
[Why Jwt](#why-jwt-point_up) <br/>
[Refresh token](#introducing-refresh-token-key) <br/>
[Refresh token rotation](#just-refresh-token-is-not-enough---refresh-token-rotation-arrows_clockwise) <br/>
[Prevent hacking](#defeating-hackers-imp) <br/>
[Project usage](#how-to-use-the-project) <br/>

## Why another refresh token demonstration ?

JWT authentication with refresh token rotation is not a new thing in the market, even there are ample resources to guide you through the setup, but every other demonstration is either without database inntegration or they do not show how to consume the tokens in the front-end. <br/>
Some demonstrations does not use rotation strategy at all!

some do not show the usage of refresh token - some do use refresh token but not refresh token rotation - some

## Why JWT? :point_up:

According to [auth0.com](https://auth0.com/docs/secure/tokens/json-web-tokens), WTs are a good way of securely transmitting information between parties because they can be signed, which means you can be sure that the senders are who they say they are. Additionally, the structure of a JWT allows you to verify that the content hasn't been tampered with. <br/>
Moreover, JWT allows us to carry on autentication without storing information on the server or in database.

## Introducing refresh token :key:

The refresh token is used to generate a new access token. Typically, if the access token has an expiration date, once it expires, the user would have to authenticate again to obtain an access token. With refresh token, this step can be skipped and with a request to the API get a new access token that allows the user to continue accessing the application resources.
<br/>
The refresh token requires greater security when it is stored than the access token, as if it were stolen by third parties, they could use it to obtain access tokens and access the protected resources of the application. In order to cut a scenario like this one, a system must be implemented in the server to invalidate a refresh token, besides setting a lifetime that obviously must be longer than that of the access tokens.

## Just refresh token is not enough - Refresh token rotation! :arrows_clockwise:

According to [auth0.com](https://auth0.com/docs/secure/tokens/json-web-tokens), refresh token rotation is a technique for getting new access tokens using refresh tokens that goes beyond silent authentication. Refresh tokens are typically longer-lived and can be used to request new access tokens after the shorter-lived access tokens expire. Refresh tokens are often used in native applications on mobile devices in conjunction with short-lived access tokens to provide seamless UX without having to issue long-lived access tokens.
<br/>
With refresh token rotation, every time an application exchanges a refresh token to get a new access token, a new refresh token is also returned. Therefore, you no longer have a long-lived refresh token that, if compromised, could provide illegitimate access to resources. As refresh tokens are continually exchanged and invalidated, the threat is reduced.

## Defeating hackers :imp:

Hackers are pretty smart, and if they get a chance they can access your cookies and local storage. So as a measure of leaked access or refresh token refresh token rotation strategy is adopted.
<br/>
### If access token is compromised:
Hacker with access token can only access your application for just the lifespan of the token which is set to 5 minutes.
After 5 minutes the old access token can not te used as authentication measure. The server generates a new access token and with the new access token the refresh token is also rotated!

### If refresh token is compromised:
Refresh token is only used for generating access token and does not play a role in authentication process. 
Even if the hacker tries to generate a new access token using the refresh token he/she, will need the access token too!

### If both access and refresh token is compromised:
If hacker gets access to both of your access and refresh token they can easily access protected routes that they shouldn't see. And to counter this kind of security breech we can easily unauthenticate every refresh token in the user array and thus stopping the hacker to access the protected routes.

## How to Use the Project?
**Step - 1**  Clone the project using ```git -clone https://github.com/srijitasd/JWT-refresh-rotation.git```. <br/>
**Step - 2** Open command prompt in the project directory and run ```npm install``` to install all the dependencies required to run the project. <br/>
**Step - 3** In the command prompt run ```npm run dev``` to start the development server. <br/>
**Step - 4** In the command prompt start the local mongoDB server. <br/>
**Step - 5** Create a new database with name ```JWT``` and import the posts.json file present in ```src/db``` directory. <br/>
**Step - 6** Open your browser and visit ```localhost:3000/```. That's it! <br/>
