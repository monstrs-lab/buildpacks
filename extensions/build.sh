#!/usr/bin/env bash
set -e

cwd=$PWD

cd "${cwd}/ffmpeg" && pack extension package monstrs/buildpack-extension-ffmpeg:0.0.1 --publish
cd "${cwd}/ghostscript" && pack extension package monstrs/buildpack-extension-ghostscript:0.0.1 --publish
cd "${cwd}/graphicsmagick" && pack extension package monstrs/buildpack-extension-graphicsmagick:0.0.1 --publish