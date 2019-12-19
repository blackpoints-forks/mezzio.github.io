# mezzio.github.io

This is the documentation website for Mezzio, and contains:

- the landing page
- assets common to all Mezzio documentation
- the Mezzio component list

## Building assets

```bash
$ cd asset
$ npm install
$ gulp
```

Once they are built, test the main landing page, using something like:

```bash
$ php -S 0:8000 -t .
```

and then browsing to http://localhost:8000

Check in your changes to the `asset` directory as well as any generated assets
when done.

## Building the homepage

You can add or edit components in the file:

- `data/component-list.mezzio.json`

Whenever you do, update the homepage using:

```bash
$ php build/build-component-lists.php
```

Preview the project using:

```bash
$ php -S 0:8000 -t .
```

and then browsing to http://localhost:8000

Check in changes to `index.html` when done.
