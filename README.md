# Mateo Molina - ASAPP Challenge - Front End #

## General ##

Application was developed using create-react-app.

I implemented:

- [MUI React Components](https://mui.com/material-ui/getting-started/overview/)
- Hooks and a customHook
- React Redux & Router
- Sass


## Setup ##

Install dependencies:

```
npm install
```

For running the React App and the Server:

```
npm run start
```

## Usage ##

When the application loads after the npm run start, you'll see the main page where you'll be able to search any city by name, state or country or/and when you scroll you get more results based on your search.

Selecting any option will save the City to the server and also to the global state of the App, that state is the one I used to populate the Favorite page where you can specifically see a list of cities you selected.

Also in the Favorite page you can remove cities from your list and that will reflect on the AutoComplete if you go back.

Thank you for this opportunity!

https://github.com/MatMol
https://www.linkedin.com/in/mateo-molina/

## Improvements ##

From a UI perspective I would've like to:

- Have the ability to add flags for the User in the AutoComplete section, so when you search or select the City appears with the correspondant flag of the country or state (ex. Vatican City)
- Probably in my case where I have the Favorite page apart from the AutoComplete, to have the flags as mentioned above or some type of image to show that specific City.
- Add some type of notification for the user when the City is added/removed from his/her selection or when an error occurs.
- Maybe add a certain brand to the page to know specifically why I'm searching my favorite cities.
