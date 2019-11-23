##React Standards and coding structure
---
#####These are the standards and guidelines that should be followed during the development of Pion Global react codebase.
---

1. Only include one React component per file.

2. Always use JSX syntax.
    `<Login />`

3. Do not use React.createElement unless you're initializing the app from a file that is not JSX.


* If you have internal state and/or refs, prefer `class extends React.Component` over `React.createClass`.

* And if you don't have state or refs, prefer normal functions (not arrow functions) over classes.

4. Dont use Mixins.

5. Do not declare variables using the `var` keyword. Always use `let` or `const`.
---

### Naming
---

1. Use `.jsx` extention for react components.

2. Use PascalCase for filenames. E.g., `ReservationCard.jsx.`

3. Use `PascalCase` for React components and `camelCase`. 

4. Avoid using DOM component prop names for different purposes. Eg., `onClick`.

5. Use camelCase for `.js` files. Eg., `authReducer.js`

6. Use camelcase for variables, functions and higher order components throughout the project.
---

### Quotes, Spacing and Details
---

1. Always use double quotes (`"`) for JSX attributes, but single quotes (`'`) for all other JS.

2. Always include a single space in your self-closing tag.
    `<Input />`

3. Use two spaces for indentations.

4. Always use `camelCase` for prop names.

5. Always include an alt prop on `<img>` tags. If the image is presentational, alt can be an empty string or the `<img>` must have `role="presentation"`.

6. Do not use words like `"image"`, `"photo"`, or `"picture"` inside the `<img>` alt prop. 

7. Avoid using an array index as key prop, prefer a unique ID.

8. Always define explicit `propTypes` for all props.

9. Always use ref callbacks.

10. Always start function braces in the same line of declaration. Same for conditionals and loops.

11. Always self-close tags that have no children.
do `<img />` not `<img></img>`

12. If your component has multi-line properties, close its tag on a new line.

13. Use arrow functions to close over local variables.

14. Bind event handlers for the render method inside the constructor.

15. Do not use underscore prefix for internal methods of a React component.
---

### Ordering the Component class
---

1. Ordering for `class extends React.Component`:
    1. optional static methods
    2. constructor
    3. `getChildContext`
    4. `getSnapshotBeforeUpdate`
    5. `componentDidMount`
    6. `getDerivedStateFromProps`
    7. `shouldComponentUpdate`
    8. `componentDidUpdate`
    9. `componentWillUnmount`
    10. clickHandlers or eventHandlers like `onClickSubmit()` or `onChangeDescription()`
    11. getter methods for render like `getSelectReason()` or `getFooterContent()`
    12. optional render methods like `renderNavigation()` or `renderProfilePicture()`
    13. render
    14. propTypes

2. Do not use `isMounted`.

3. Do not use `componentWillMount` or `componentWillReceiveProps`. Use the new lifecycle methods instead.

4. This application uses the `redux-thunk` middleware. Therefore, the `dispatch` method is availabele within the action. No need to use `mapDispatchToProps` within the component

5. This application uses the Reactstrap UI library. Therefore, Ui components can be developed directly Eg. use `<Container>` instead of `<div className="container">`.

6. Do not use the `fetch` API for AJAX requests. Use the `axios` library instead.