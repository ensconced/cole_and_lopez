# coleandlopez.com

This site is hosted at www.coleandlopez.com using github pages.

To run the site locally, clone the repo and run `bundle exec jekyll serve`.

It uses forestry CMS - this can be accessed at www.coleandlopez.com/admin.

The contact form uses a ruby/sinatra backend, hosted by heroku

### workflow

- do development on staging branch
- run yarn deploy:staging to test changes at https://ensconced.github.io/cole_and_lopez_staging/
- when ready, merge staging into prod
- deploy to prod by running yarn deploy:prod

## how staging works

The staging deployment works by pushing to a second repo, which also has github pages set up. The only difference is that the staging environment doesn't (or at least, shouldn't) have a CNAME file - so it's only available at the default github pages URL https://ensconced.github.io/cole_and_lopez_staging/ - not at www.coleandlopez.com. The deploy scripts try to make sure that the CNAME is present for the prod deployment, and not present for the staging deployment.

### useful links

- backend repo https://github.com/ensconced/cole-and-lopez-contact-form-backend
- backend on heroku https://dashboard.heroku.com/apps/cole-and-lopez-form-backend
- google recaptcha login: https://www.google.com/recaptcha/admin/site/343543709
