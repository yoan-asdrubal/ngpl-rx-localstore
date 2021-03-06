#!/bin/bash

set -e # exit with nonzero exit code if anything fails
# && $TRAVIS_PULL_REQUEST == "false"
if [[ $TRAVIS_BRANCH == "main" ]]; then

echo "Starting to update gh-pages\n"

#copy data we're interested in to other place
cp -R docs $HOME/docs

#go to home and setup git
cd $HOME
git config --global user.email "travis@travis-ci.org"
git config --global user.name "Travis"

#using token clone gh-pages branch
git clone --quiet --branch=gh-pages https://${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git gh-pages > /dev/null

#go into directory and copy data we're interested in to that directory
cd gh-pages
cp -Rf $HOME/docs/* .

#add, commit and push files
git add -f .
git commit -m "Travis build $TRAVIS_BUILD_NUMBER"
git push -fq origin gh-pages > /dev/null

echo "Done updating gh-pages\n"

else
 echo "Skipped updating gh-pages, because build is not triggered from the master branch."
fi;
