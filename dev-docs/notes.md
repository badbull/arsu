# dev notes

## TODO

- user.spec after remove test user broken??
- other validations
- on creation json and token user-ids should match or use only token
- validate that request body is valid json to get rid of syntax errors
    - https://www.npmjs.com/package/express-validation ?? 
- delete playlist incl. content: http://stackoverflow.com/questions/2914936/mysql-foreign-key-constraints-cascade-delete

## Consider

- separate routefiles for modules?
- authentication check by route "middleware" function instead of app.all() ?

## Done

- db: username should be unique
- password should be hashed

## Links

- https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
- https://www.tutorialspoint.com/nodejs/nodejs_request_object.htm
- http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/ (https://mochajs.org/)
- http://beletsky.net/2014/03/testable-apis-with-node-dot-js.html
- https://github.com/dwyl/learn-json-web-tokens
- https://www.loggly.com/blog/http-status-code-diagram/ 
