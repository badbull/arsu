# AudioResourceSpaceUsers (& playlists) management service

REST API & database

## Installation

**Prerequisities:** Mysql/Mariadb database with name `arsu`

Edit [src/config.sample.js](src/config.sample.js) and save it to `config.js`.

On the command-line type:

```sh
# Install node modules listed in package.json
npm install
# Create db tables
mysql -u<DB_USER> -p<DB_PASSWORD> arsu < build-db.sql
```
## Testing

```sh
# Install mocha globally if missing:
npm install -g mocha 
# Run tests
npm test
```

## API Docs

Generate documentation into [docs/](docs/) folder:

```sh
# Install apidocjs globally if missing:
npm install -g apidoc 
# Generate docs
apidoc -i src/ -o docs/
```
