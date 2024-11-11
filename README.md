# Home Library Service

## Description

The **Home Library Service**  implements a full set of REST API endpoints for managing users and musical entities like artists, albums, and tracks. Future plans include database integration.
## Prerequisites

Ensure that **Node.js** and **Git** are installed on your machine.

## Downloading

```git clone {repository URL}```

## Switch to ```api``` branch
## Installing NPM modules

```npm install --legacy-peer-deps```

## Running application

```npm start```


## Testing
To run all tests without authorization

```npm run test```

To run only one of all test suites

```npm run test -- <path to suite>```

To run all test with authorization

```npm run test:auth```

To run only specific test suite with authorization

```npm run test:auth -- <path to suite>```

### Auto-fix and format

```npm run lint```

```npm run format```


## Structure

The project is divided into several core modules, each responsible for different parts of the logic:

- **User** — manage users.
- **Artist** — manage artists.
- **Track** — manage tracks.
- **Album** — manage albums.
- **Favorites** — manage favorite entities.
- **GlobalDB** — manage in-memory database(included global in-memory db service).

## Endpoints

### User

- **GET /user** — Retrieve all users.
- **GET /user/:id** — Retrieve a user by ID.
- **POST /user** — Create a new user.
- **PUT /user/:id** — Update a user's password.
- **DELETE /user/:id** — Delete a user.

### Artis

- **GET /artist** — Retrieve all artists.
- **GET /artist/:id** — Retrieve an artist by ID.
- **POST /artist** — Add a new artist.
- **PUT /artist/:id** — Update artist information.
- **DELETE /artist/:id** — Delete an artist.

### Track

- **GET /track** — Retrieve all tracks.
- **GET /track/:id** — Retrieve a track by ID.
- **POST /track** — Create a new track.
- **PUT /track/:id** — Update track information.
- **DELETE /track/:id** — Delete a track.

### Album

- **GET /album** — Retrieve all albums.
- **GET /album/:id** — Retrieve an album by ID.
- **POST /album** — Create a new album.
- **PUT /album/:id** — Update album information.
- **DELETE /album/:id** — Delete an album.

### Favorites

- **GET /favs** — Retrieve all favorite items.
- **POST /favs/track/:id** — Add a track to favorites.
- **DELETE /favs/track/:id** — Remove a track from favorites.
- **POST /favs/album/:id** — Add an album to favorites.
- **DELETE /favs/album/:id** — Remove an album from favorites.
- **POST /favs/artist/:id** — Add an artist to favorites.
- **DELETE /favs/artist/:id** — Remove an artist from favorites.

## Swagger UI

For convenient interaction with the API, the project uses **Swagger** for API documentation. The Swagger UI can be accessed at: [http://localhost:4000/doc/](http://localhost:4000/doc/). The port can be changed in the `.env` file.

