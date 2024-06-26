# {{appName}}

{{appDescription}}

## Dependencies

- [Visual Studio Code](https://code.visualstudio.com/download)
- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org)

### VS Code extensions

- [Remote-Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Running your app

In the VS Code _Command Palette_ choose "Open Folder in Container" which will launch your application in a Docker container allowing for realtime development and testing.  Once launched, the application can be accessed using the [Swagger UI](https://swagger.io/tools/swagger-ui) at [http://localhost:3000{{routePrefix}}](http://localhost:3000{{routePrefix}}) or by using the [VS Code Swagger Viewer](https://marketplace.visualstudio.com/items?itemName=Arjun.swagger-viewer) (`swagger.json`)

## Deploying to AWS

    $ ./deploy --profile <AWS credentials profile>

## AWS requirements

In order to successfully deploy your application you must have [set-up your AWS Config](https://docs.aws.amazon.com/config/latest/developerguide/gs-cli.html) and have [created an IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html) with the following [policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage.html):

- [IAMFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FIAMFullAccess)
- [CloudFrontFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FCloudFrontFullAccess)
- [AWSCloudFormationFullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSCloudFormationFullAccess)
- [AWSLambda_FullAccess](https://console.aws.amazon.com/iam/home#/policies/arn%3Aaws%3Aiam%3A%3Aaws%3Apolicy%2FAWSLambda_FullAccess)

WARNING: The policies above are provided to ensure a successful application deployment.  It is recommended that you adjust these policies to meet the security requirements of your Lambda application.  They should NOT be used in a Production environment.

### Mounting the AWS configuration

If you need to access AWS services from within the container you will need to enable* the following line in: `.devcontainer/devcontainer.json`

```json
"mounts": ["source=${localEnv:HOME}/.aws,target=/root/.aws,type=bind,consistency=cached"],
```

(*) Requires container rebuild.

## Developers

### CLI options

Run [ESLint](https://eslint.org/) on project sources:

    $ npm run lint

Generate [Swagger](https://swagger.io) OpenAPI definitions:

    $ npm run genapi

Generate documentation using [JSDoc](https://jsdoc.app):

    $ npm run gendoc

## Known issues

### Project files are assigned incorrect priviledges

If you experience this when working between local/remote development environments this is due to the user UID [not being present during build time](https://github.com/microsoft/vscode-remote-release/issues/6834#issuecomment-1158600543). In this case the default `1000` is defined as both the UID/GID for the remote user.  You can override this behavior by updating the following project `devcontainer.json` build arguments or by exporting the UID/GID in your `.bash_profile`.

```json
"build": {
  "dockerfile": "Dockerfile",
  "args": {
    "UID": "${localEnv:UID:1234}", // Default to 1234
    "GID": "${localEnv:GID:1234}"
  }
},
```

## References

- [Setting IAM Permissions and Roles](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-edge-permissions.html)
- [Cache behavior settings](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/distribution-web-values-specify.html#DownloadDistValuesObjectCaching)
- [AWS SDK for JavaScript](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/index.html)
- [lambda-lambda-lambda](https://github.com/lambda-lambda-lambda)
