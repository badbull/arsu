# AudioResourceSpaceUsers (& playlists) management service

REST API & database

## Installation

**Prerequisities:** Mysql/Mariadb database with name `arsu`

Edit `src/config.sample.js` and save it to `config.js`.

On the command-line type:

```sh
npm install
mysql -u<DB_USER> -p<DB_PASSWORD> arsu < build-db.sql
```
