#!/bin/sh
set -e
ssh theodorc@api.theodorc.no 'cd dev/Homepage && git pull'
