#! /usr/bin/env bash

branch=$(git branch --show-current)

if [ "$branch" = staging ]
then
  if [ -z "$(git status --porcelain)" ]
  then
    if ls CNAME > /dev/null;
    then
      rm CNAME
      git commit -am "remove CNAME (automatic commit by deploy script)"
      git push cole_and_lopez_staging staging
    fi
    echo your changes will soon appear at https://ensconced.github.io/cole_and_lopez_staging/
  else
    echo git tree must be clean
  fi
else
  echo must be on branch '"staging"'
fi
