#!/bin/sh
cd /Users/macbookpro/Documents/Autumn/github/node-blog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log