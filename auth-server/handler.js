const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const calendar = google.calendar("v3");

/* SCOPES set access levels: read only */

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

/* Credential values: required to get access */

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  redirect_uris: ["https://rumpeltin.github.io/meet/"],
  javascript_origins: ["https://rumpeltin.github.io", "http://localhost:3000"],
};
const { client_secret, client_id, redirect_uris, calendar_id } = credentials;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

/**
 *  
 * 1. generate a URL for users to get authenticated with Google
 * users receive a code as a URL parameter
 * 
**/

module.exports.getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Access-Control-Allow-Credentials": true
    },
    body: JSON.stringify({
      authUrl: authUrl
    }),
  };
};


/**
 *
 * Scopes array passed to the `scope` option.
 * Any scopes passed must be enabled in the
 * "OAuth consent screen" settingsConsole.
 * Any passed scopes will be seen when the consent 
 * screen is displayed to the users.
 *
**/

module.exports.getAccessToken = async (event) => {
  // values used to instantiate the OAuthClient
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
    // decode authorization code extracted from URL query
    const code = decodeURIComponent(`${event.pathParameters.code}`);
  
    return new Promise((resolve, reject) => {
      /**
       *  exchange authorization code for access token  a “callback” after exchange
       *    - arrow function with results as parameters: “err” and “token”
       */
  
      oAuth2Client.getToken(code, (err, token) => {
        if (err) {
          return reject(err);
        }
        return resolve(token);
      });
    })
      .then((token) => {
        // respond with OAuth token 
        return {
          statusCode: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(token),
        };
      })
      .catch((err) => {
        // handle error
        console.error(err);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(err),
        };
      });
  };

module.exports.getCalendarEvents = async(event) => {
  // values used to instantiate the OAuthClient
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  // decode authorization code extracted from URL query
    const access_token = decodeURIComponent(`${event.pathParameters.access_token}`);
    oAuth2Client.setCredentials({ access_token });

  return new Promise((resolve, reject) => {

    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      },
      (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      }
    );
  })
    .then((results) => {
      // respond with OAuth token 
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify({ events: results.data.items })
      };
    })
      .catch((err) => {
        // handle error
        console.error(err);
        return {
          statusCode: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(err),
        };
      });

};