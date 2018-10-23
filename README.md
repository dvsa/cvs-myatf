# ATF Account View Prototype

This project is a protoype to test new user flows through an ATF account management system.

It enables users to test viewing accounts, making new payments, seeing vehicle test histories and creating alarms based on certain thresholds. The feedback we get from demonstrating these new workflows will give important information for moving from Alpha stage into Beta.

## GOV.UK Prototype kit

This project is based on the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs).

Go to the [GOV.UK Prototype Kit site](https://govuk-prototype-kit.herokuapp.com/docs) to download the latest version and read the documentation.

### About the prototype kit

The prototype kit provides a simple way to make interactive prototypes that look like pages on GOV.UK. These prototypes can be used to show ideas to people you work with, and to do user research.

Read the [project principles](https://govuk-prototype-kit.herokuapp.com/docs/principles).

### Security

If you publish your prototypes online, they **must** be protected by a [username and password](https://govuk-prototype-kit.herokuapp.com/docs/publishing-on-heroku). This is to prevent members of the public finding prototypes and thinking they are real services.

You must protect user privacy at all times, even when using prototypes. Prototypes made with the kit look like GOV.UK, but do not have the same security provisions. Always make sure you are handling user data appropriately.

## Development

This is a nodejs project. To get started, clone the repo and run:

`npm install`

You need to set an environmental variable to run locally:

`RUNNINGLOCALLY=true`

This can be set in the .env file or as a global environmental variable.

You should also set a default username and password so you can log into the site.

`USERNAME=user`

`PASSWORD=pwd`

Or you can bypass the username and password by turning auth off.

`USE_AUTH=false`

Then start the server:

`npm start`

Open up your browser, by default this is

`http://localhost:3000`

The sourcecode is watched by this server, so any changes to the css and html should cause a recompile.

### Testing

To run unit tests, run

`npm run unit`.

Integration tests are run with:

`npm run integration`.

To run both, use

`npm run test`.

Both test are run automatically as part of the prepush hook. Please add tests when you add new functionality.

## Distribution

The steps you need to deploy:

```
npm install
npm run lint
npm run test
npm run build-dist
cd dist
```

Here will be two zip files, the lambda server and assets.

The server can be deployed to a single lambda function, behind an API Gateway Proxy to forward the url requests on as they are.
We would like the assets to be deployed to an S3 bucket.

### build-dist options

You can configure build-dist with optional parameters to change the file names for your assets and lambda zip files.

`npm run build-dist -- --assets <assetsFilename.zip> --lambda <lambdaFilename.zip>`

### Lambda Setup

For the lambda, the environment is Node 6.10, and the handler function should be 'lambda.handler'.

The lambda job will need environmental variables set up:

```
URLROOT: // sub directory of API gateway stage, ie dev/ - can be removed if the app is served from the root
ASSETS: // URL TO S3 bucket
NODE_ENV: production // Turn on a few optimisations and prod features
USERNAME: // a username to protect the site in alpha demo, see Security guidelines.
PASSWORD: // a password to protect the site in alpha demo, see Security guidelines.
APPSECRET: // a long random string, ideally generated each deployment - used to persist cookies and session data between servers.`
```

### API Gateway Setup

For the API Gateway, it needs to act as a proxy for the ANY resource at the root / and should use lambda proxy integration.
It also needs a resource adding called /{proxy+} for the ANY resource and should also use lambda proxy integration.
You need to add '*/*' to binary support.

### S3 setup

The assets.zip file needs unzipping and uploaded to S3. Remeber to add the path to the root of the S3 bucket to the lambda function.

## Environment Variables

The following env variables are supported:

`URLROOT`

`ASSETS`

`RUNNINGLOCALLY`

`NODE_ENV`

`USERNAME`

`PASSWORD`

`USE_AUTH`

`APPSECRET`


### Recommended overrides for Develpment

`RUNNINGLOCALLY=true`

This will set the server to run locally.

The defaults for the paths should be fine.
You can set these either as system global env variables or use the .env file.

When the site is on public servers, we need to protect it with a username and password. When developing, this might be annoying, so you can turn this off:

`USE_AUTH=false`

You also need to set APPSECRET, this is used for cookies and persistance.

`APPSECRET: // anything you like`

### Recommended overrides for Production


`URLROOT: // sub directory of API gateway stage, ie dev/ - can be removed if the app is served from the root`

`ASSETS: // URL TO S3 bucket`

`NODE_ENV: // can be production, defaults to development if not set.`

`USERNAME: // a username to protect the site in alpha demo, see Security guidelines.`

`PASSWORD: // a password to protect the site in alpha demo, see Security guidelines.`

`APPSECRET: // a long random string, ideally generated each deployment - used to persist cookies and session data between servers.`


The other variables can be left as the default.

### Git Hooks

Please set up the following prepush git hook in .git/hooks/pre-push

```
#!/bin/sh
npm run prepush && git log -p | scanrepo
```

#### Security

Please install and run the following securiy programs as part of your testing process:

https://github.com/awslabs/git-secrets

- After installing, do a one-time set up with `git secrets --register-aws`. Run with `git secrets --scan`.

https://github.com/UKHomeOffice/repo-security-scanner

- After installing, run with `git log -p | scanrepo`.

These will be run as part of prepush so please make sure you set up the git hook above so you don't accidentally introduce any new security vulnerabilities.
