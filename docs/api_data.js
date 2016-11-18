define({ "api": [
  {
    "type": "post",
    "url": "/login",
    "title": "Login",
    "version": "0.2.0",
    "name": "PostAuth",
    "group": "Authentication",
    "permission": [
      {
        "name": "all",
        "title": "No authentication needed.",
        "description": ""
      }
    ],
    "description": "<p>Log in and get token for the user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"john\",\n  \"password\": \"examplepass\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token for the user authentication.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  message: 'Logged in successfully',\n  token: 'eyJhIkpXVCJ9.ey2NywiZXhwIjoxNDc4NTQwNDY3fQ.BPfXvi5RyAQ'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/authentication.routes.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "delete",
    "url": "/favourites/:id",
    "title": "Delete a favourite",
    "version": "0.2.0",
    "name": "DeleteFavourite",
    "group": "Favourite",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Deletes a favourite of the authenticated user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the favourite.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Result of the request.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  message: 'Favourite deleted'\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/favourite.routes.js",
    "groupTitle": "Favourite"
  },
  {
    "type": "get",
    "url": "/favourites",
    "title": "Request a list of favourites",
    "version": "0.2.0",
    "name": "GetCurrentUserFavourites",
    "group": "Favourite",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Request a list of favourite podcasts added by authenticated user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "playlists",
            "description": "<p>List of lists.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playlist.id",
            "description": "<p>Id of the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  { id: 59, podcast_id: 1, user_id: 149 },\n      ...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/favourite.routes.js",
    "groupTitle": "Favourite"
  },
  {
    "type": "post",
    "url": "/favourites",
    "title": "Create a new favourite",
    "version": "0.2.0",
    "name": "PostFavourite",
    "group": "Favourite",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Creates a new playlist for the authenticated user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "podcast_id",
            "description": "<p>Id of the podcast.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"podcast_id\": 6\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Result of the request.</p>"
          },
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the created playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  message: 'Favourite added',\n  id: 111\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/favourite.routes.js",
    "groupTitle": "Favourite"
  },
  {
    "type": "get",
    "url": "/playlists",
    "title": "Request a list of all playlists in service",
    "version": "0.2.0",
    "name": "GetAllPlaylists",
    "group": "Playlist",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "playlists",
            "description": "<p>List of lists.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playlist.id",
            "description": "<p>Id of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "playlist.playlist_name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playlist.user_id",
            "description": "<p>User id of the playlist's owner.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 11,\n  \"playlistname\": \"johnd\",\n  \"user_id\": 69\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlist.routes.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/user",
    "title": "Request a list of playlists of user",
    "version": "0.2.0",
    "name": "GetCurrentUserPlaylists",
    "group": "Playlist",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Request a list of playlists created by authenticated user.</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "playlists",
            "description": "<p>List of lists.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playlist.id",
            "description": "<p>Id of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "playlist.playlist_name",
            "description": "<p>Name of the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  { id: 75, playlist_name: 'Test playlist', user_id: 151 },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlist.routes.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/:id",
    "title": "Request a playlist",
    "version": "0.2.0",
    "name": "GetPlaylist",
    "group": "Playlist",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Request a full playlist incl. contents created by authenticated user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the playlist.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user_id",
            "description": "<p>Id of the owner.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "playlist_name",
            "description": "<p>Name of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "content",
            "description": "<p>List of playlist items.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "content.id",
            "description": "<p>Id of the playlist item.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "content.podcast_id",
            "description": "<p>Id of the podcast.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  playlist_id: 75,\n  user_id: 151,\n  playlist_name: 'Test playlist',\n  content: [\n    { id: 75, podcast_id: 1 },\n    ...\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlist.routes.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "get",
    "url": "/playlists/user/:id",
    "title": "Request a list of playlists of user",
    "version": "0.2.0",
    "name": "GetUserPlaylists",
    "group": "Playlist",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Request a list of playlists created by specific user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "playlists",
            "description": "<p>List of lists.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "playlist.id",
            "description": "<p>Id of the playlist.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "playlist.playlist_name",
            "description": "<p>Name of the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  { id: 75, playlist_name: 'Test playlist', user_id: 151 },\n  ...\n]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlist.routes.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "post",
    "url": "/playlists",
    "title": "Create a new Playlist",
    "version": "0.2.0",
    "name": "PostPlaylist",
    "group": "Playlist",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "description": "<p>Creates a new playlist for the authenticated user.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "playlist_name",
            "description": "<p>Name of the playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"playlist_name\": \"My playlist\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Result of the request.</p>"
          },
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the created playlist.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  message: 'Playlist created successfully',\n  id: 11\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/playlist.routes.js",
    "groupTitle": "Playlist"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete a user",
    "version": "0.2.0",
    "name": "DeleteUser",
    "group": "User",
    "permission": [
      {
        "name": "admin",
        "title": "Admin user access only",
        "description": "<p>Valid authentication token with admin privileges must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Unique ID of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>What happened</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Request User information",
    "version": "0.2.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>User info.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.email",
            "description": "<p>email of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"username\": \"johnd\",\n  \"email\": \"john@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"message\": \"User Not Found\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users",
    "title": "Request User list",
    "version": "0.2.0",
    "name": "GetUsers",
    "group": "User",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "x-access-token",
            "description": "<p>Authentication token.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users.</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": "<p>User id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.username",
            "description": "<p>Username of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>Email address of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[{\n  \"id\": 1,\n  \"username\": \"johnd\",\n  \"email\": \"john@example.com\"\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users",
    "title": "Create a new User",
    "version": "0.2.0",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "all",
        "title": "No authentication needed.",
        "description": ""
      }
    ],
    "description": "<p>Creates a new user. No authentication needed. Anyone can create a new user (register to the service).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email address of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"john\",\n  \"password\": \"examplepass\",\n  \"email\": \"john@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>The new user id.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  message: 'User created successfully',\n  id: 69\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users",
    "title": "Modify user data",
    "version": "0.2.0",
    "name": "PutUser",
    "group": "User",
    "permission": [
      {
        "name": "token",
        "title": "Logged in user access only",
        "description": "<p>Valid authentication token must be provided within request.</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": true,
            "field": "x-access-token",
            "description": "<p>Authentication token. Optional if token is provided in request params or request body.</p>"
          }
        ]
      }
    },
    "description": "<p>User can change his/her username, password or email address. only the field to be updated is needed.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>Username of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "password",
            "description": "<p>Password of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "email",
            "description": "<p>Email address of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "token",
            "description": "<p>Access token. Optional if it is provided in the request headers or params.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"email\": \"john.new@example.com\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>Message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"message\": \"User data updated\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/routes/user.routes.js",
    "groupTitle": "User"
  }
] });
