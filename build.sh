#!/bin/sh

# Generate build
hugo

# Tidy html files
for html_file in $(find docs -name "*.html"); do
    tidy -o $html_file -i -w 0 -quiet --drop-empty-elements no --tidy-mark no $html_file
done
