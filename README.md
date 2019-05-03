# server

## endpoint

No|Route|Method|Request|Response|Description
---|---|---|---|---|---|
1| /login| POST|``` body: { id_token: google id token } ``` |``` status(200), response: { token: jwt } ```| User google login
2| /nasa| POST |  ``` body: { date: "YYYY-MM-DD"} ``` | ```status(200) response: { status, message,   data:{ date: (apod date), title: (apod title), url: (picture url), explanation: (apod desc), translation: { id: (indonesian), su: (sundanese), jv: (javanese), ms: (malaysian) }, tags: [apod tags], special: (video url if any) } })``` | Request NASA's apod with more love
