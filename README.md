# Trails Across New Mexico

Reimagined as a [Progressive Web App](https://developers.google.com/web/fundamentals/getting-started/codelabs/your-first-pwapp/).

## Files

```
README.md           - this file
.gitignore          - configuration for what files Git should ignore for any new commits
gulpfile.js         - configuration for Gulp tasks, currently just configuration for sw-precache
package.json        - metadata for this project, including the npm dependencies
viva_connects_rsa   - where your private key for SSHing into viva-connects server should go
web/                - directory containing static assets to be hosted online
    index.html          - the base HTML file for the app
    service-worker.js   - service worker script that manages caching (generated automatically)
    static/             - directory containing all static files for the app
        css/            - CSS stylesheets
        js/             - JavaScript code
        images/         - graphics and photos
        fonts/          - font files
        data/           - JSON files containing trail data
```

## Setting up development environment

First you'll need to install NodeJS if you haven't already. This will vary
depending on your operating system and package manager.

 - Try [the Node downloads page](https://nodejs.org/en/download/) if you're using macOS or Windows
 - If you're using Linux, you might try [the package manager instructions page](https://nodejs.org/en/download/package-manager/).

After they're installed, you should be able to run the following to check the versions of `node` and `npm`:

    node --version
    npm --version

Now we install the prerequisite Node packages that are defined in our
`package.json`, such as `sw-precache`:

    npm install

Now we should be ready to run the development server:

    npm run server

You should be able to view the app now at [http://localhost:8000/]. If you make any
changes to your code, they should be available after refreshing the browser (you
may have to [disable the cache](https://www.technipages.com/google-chrome-how-to-completely-disable-cache)
first).

To push your changes to the server, you will first need to obtain a private
key for SSH-ing into the VIVA Connects server. This means logging into the
administrative panel and creating a new private-public key pair, then saving
the resulting private key to `viva_connects_rsa` in this directory (this file
will be ignored by Git). Once that is ready, then you can just perform a one-click
deploy:

    npm run deploy
