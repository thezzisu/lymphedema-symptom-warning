#!/usr/bin/env zx
import 'zx/globals'
/* global $, cd, path */

cd(path.join(__dirname, '..', 'packages'))
await $`pwd`
cd('frontend')
await $`yarn`
await $`yarn build`
