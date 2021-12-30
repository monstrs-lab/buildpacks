#!/usr/bin/env bash
set -e

cwd=$PWD

yarn workspace @monstrs/buildpack-yarn-install build
cd "${cwd}/yarn-install" && pack buildpack package monstrs/buildpack-yarn-install:0.0.3 --config ./package.toml

yarn workspace @monstrs/buildpack-yarn-cache build
cd "${cwd}/yarn-cache" && pack buildpack package monstrs/buildpack-yarn-cache:0.0.3 --config ./package.toml

yarn workspace @monstrs/buildpack-yarn-workspace-start build
cd "${cwd}/yarn-workspace-start" && pack buildpack package monstrs/buildpack-yarn-workspace-start:0.0.3 --config ./package.toml

docker push monstrs/buildpack-yarn-install:0.0.3
docker push monstrs/buildpack-yarn-cache:0.0.3
docker push monstrs/buildpack-yarn-workspace-start:0.0.3

cd "${cwd}/yarn-workspace" && pack buildpack package monstrs/buildpack-yarn-workspace:0.0.3 --config ./package.toml

docker push monstrs/buildpack-yarn-workspace:0.0.3
