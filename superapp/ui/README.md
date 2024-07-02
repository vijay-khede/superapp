# UI Documentation

This is monorepo angular application, generated using NX tool.

## Development server

Run ng serve for a dev server. Navigate to <http://localhost:4200/>. The app will automatically reload if you change any of the source files.

## Build

npm run nxhm target 'app-name' -- [arguments]

- app-name - Application Name

- target - serve, build, ...etc

- arguments - nx cli arguments
  ex : npm run nxhm build -- --prod

## Serve

npm run nxhm serve 'app-name' -- [argumenets]

## Boost serve time

npm run nxhms 'app-name' -- [arguments]

## Serve mock server

1. npm run nxhms 'app-anme' -- --c=test [first terminal]

2. nx serve mock-api [second terminal]

## Add library

ng g lib library-name --directory=modules/library-name --prefix=lib-prefix --importPath=@enttribe/modules-library-name.
