# coleandlopez.com

[![Netlify Status](https://api.netlify.com/api/v1/badges/c527136d-2179-4bdf-a66f-e28311099cd2/deploy-status)](https://app.netlify.com/sites/cole-and-lopez/deploys)

This site is hosted at www.coleandlopez.com using netlify.

Pushing to master will re-deploy the live site!

## development

run `yarn start:dev` to run a local server

## staging

To test changes before they go into production, push up the `staging` branch. This will deploy to staging.coleandlopez.com

## contact form

The contact form is handled by netlify. Because the form is rendered by react, netlify requires there to be another form, with a matching set of inputs, hidden in index.html. see https://docs.netlify.com/forms/setup/#javascript-forms

The form won't work when running in dev mode locally.
