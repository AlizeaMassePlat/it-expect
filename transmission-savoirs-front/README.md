# projet-11-transmission-des-savoirs-front

## SPRINT 1

### How to work

Always start from branch `sprint1`

```bash
git checkout sprint1
```

Create a new branch to work on your feature

```bash
git checkout -b <custom_name>
```

Commit your code and push it on that new branch

```bash
git push origin <custom_name>
```

On github : Create a pull request to merge your new branch on `sprint1`

### Git naming convention

We are using [Gitmoji](https://gitmoji.dev/) + [conventional commits](https://www.conventionalcommits.org/)\

```bash
:gitmoji: type : commit name
```

```bash
:wrench: config : commit name
```

```bash
:rocket: feat : commit name
```

```bash
:art: style : commit name
```

```bash
:hammer: fix : commit name
```

```bash
:memo: doc : commit name
```

```bash
:sparkles:: refacto : commit name
```

### Comments

We are using [JS DOC](https://jsdoc.app/) to comment our code.\
Snippet : `/**`

_Always use english langage in your code_

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```

### Directory & File Structure

```
Sprint1
│   README.md
│   .config-files
│   ...
│
└───config
│   └── webpack config files 
│   
└───public
|   └── robot.txt
| 
└───src (working folder)
    ├── action
    |   └── index.js (redux actions creator)
    |
    ├── assets
    |   └── ...
    |
    ├── components
    |   └── every components of our project
    |
    ├── hooks
    |   └── custom hooks
    |
    ├── middlewares
    |   └── redux middlewares
    |
    ├── pages (we want to separate pages from components for a better organization)
    |   ├── 404
    |   |   └── index.js
    |   |
    |   ├── Contact
    |   |   └── index.js
    |   |
    |   ├── Home
    |   |   └── index.js
    |   |
    |   └── ...
    |
    ├── reducers
    |   ├── index.js
    |   ├── posts.js
    |   └── user.js
    |
    ├── selectors
    |   └── custom features
    |
    ├── store
    |   └── index.js
    |
    ├── styles
    |   ├── _reset.css
    |   ├── _vars.scss (variables)
    |   └── _style.scss (generic style)
    |
    └── index.js (entry point)
```

### SCSS helpers

Breakpoints :

```
  'small':  ( min-width:  480px )
  'medium': ( min-width:  768px )
  'large':  ( min-width: 1024px )
  'extra-large': ( min-width: 1200px )
```

Usefull mixins :

  ```scss
  @use '../../styles/mixin';
  ```

- examples for breakpoints :

  ```scss
  @include mixin.media('small') {
    color: blue;
  }

  @include mixin.media('large') {
    color: red;
  }
  ```

- paddings :
  
  ```scss
  @include mixin.padding;
  ```

  will return

  ```css
    .Class {
        padding: 0.625em; /* (10px) */
    }

    @media ( min-width:  768px ) { 
        .Class {
            padding: 1.25em; /* (20px) */
        }
    } 

    @media ( min-width:  1024px ) { 
        .Class {
            padding: 1.875em; /* (30px) */
        }
    } 
  ```
  
### `npm i`

Install all dependencies we need to work.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.
