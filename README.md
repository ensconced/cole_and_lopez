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

### useful links

- backend repo https://github.com/ensconced/cole-and-lopez-contact-form-backend
- backend on heroku https://dashboard.heroku.com/apps/cole-and-lopez-form-backend
- google recaptcha login: https://www.google.com/recaptcha/admin/site/343543709
