# coleandlopez.com

This site is hosted at www.coleandlopez.com using github pages.

To run the site locally, clone the repo and run `bundle exec jekyll serve`.

It uses forestry CMS - this can be accessed at www.coleandlopez.com/admin.

The contact form uses a sinatra backend, hosted by heroku. The repo for that is here: https://github.com/ensconced/cole-and-lopez-contact-form-backend

The build for the front end has two steps:

- run the webpack build, which intakes from `/src`, and outputs to `/built`
- run the jekyll build, which intakes from `/built`, and outputs to `/_site`

NB the second step is required for local development, but the `_site` can directory is git-ignored since github does this build for us behind the scenes in the deployment to github-pages.
