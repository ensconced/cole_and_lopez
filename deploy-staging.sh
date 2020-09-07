#! /usr/bin/env bash

set -eu

branch=$(git branch --show-current)

if [ "$branch" = staging ]
then
  if [ -z "$(git status --porcelain)" ]
  then
    rm CNAME
    git commit -am "remove CNAME"
    git push staging staging
    echo your changes will soon appear at https://ensconced.github.io/cole_and_lopez_staging/
  else
    echo git tree must be clean
  fi
else
  echo must be on branch '"staging"'
fi
