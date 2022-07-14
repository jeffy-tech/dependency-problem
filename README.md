# Problem:

Dependency management can cause huge headaches for teams as they troubleshoot and resolve conflicting in first-order (1-layer deep) transient dependencies. This is especially true for large applications with sprawling dependency trees. In order to reduce the burden on individual teams and engineers, we’ve been asked to build an application that will allow engineers to quickly check for dependency collisions between NPM packages.

# Task

Enhance the existing `/dependency` endpoint in the node server to check version conflicts in transient dependencies. The endpoint should, at a minimum, take in two package names and their versions (i.e. package_a at version_a, package_b at version_b). The endpoint should return a list of dependency conflict tuples containing package name and conflicting versions: `[dependency_package_name, version_for_a, version_for_b]`. Conflicts should be determined by dependency version mismatches between package_a and package_b.

# Instructions

Fork this repository to write your solution in. As you work please make use of commits (frequency, message, etc) as you would when working in any professional or Open Source project. When your submission is complete open a Pull Request against the original repository and send a link to your pull request to the email provided.

## For Non NodeJS / TypeScript Solutions

Although this solution is in TypeScript and NodeJS we do allow submitting solutions in other languages (although strongly recommend doing it by extending this repository using TypeScript). That being said, if you do choose to use a different language please make sure that there is a clear documentation on how to install dependencies, configure the system and run the solution in the readme file as if you are explaining to someone that never used the stack that you are submitting the solution with.

## Tech Stack

The project is currently set up with a relatively vanilla NodeJS + Express server using TypeScript. For those not familiar with TypeScript you can make the project able to support normal JavaScript by tweaking some settings in [tsconfig.json](./tsconfig.json)

## Prerequisites

- [Node v16 LTS](https://nodejs.org/en/download/)

## Getting Started

To install dependencies and start the server in development mode:

```sh
npm ci
npm run dev
```

Then we can try the `/dependency` endpoint. Here is an example that uses `curl` and
`jq`, but feel free to use any client. I recommend PostMan or a web browser for easy tweaking/parsing.

```sh
curl -s http://localhost:3000/dependency/react/16.13.0 | jq .
```

### Alternative verification

We can also use OpenAPI spec to generate Swagger endpoints. To review the documentation, visit [http://localhost:3000/docs](http://localhost:3000/docs).

See:

- OpenAPI [https://www.openapis.org/](https://www.openapis.org/)
- TSOA [https://github.com/lukeautry/tsoa](https://github.com/lukeautry/tsoa)

To start the server in production mode,

```
npm run build
npm start
```

Most of the code is boilerplate; the logic for the `/dependency` endpoint can be
found in [src/dependency.ts](src/dependency.ts), and some basic tests in
[test/dependency.test.ts](test/dependency.test.ts)

You can run the tests with

```sh
npm run test

# Or in watch mode
npm run test -- --watch
```

Good luck, and enjoy!

## Things to consider

- Look at the inner "dependencies" object of a package for analysis of
  first-order dependencies.

- npm returns dependency ranges that follow the
  [Semantic Versioning](https://semver.org/) specification, which you'll need to
  account for.

- The packages update from time to time, just as their dependencies do.

- What makes a good web service? API, performance, data storage, low latency,
  scalability, monitoring, a great web interface, you name it :)

- Consider the quality and structure of your codebase; is it maintainable?

- Consider production readiness (to some extent) and is it safe to deploy changes?
