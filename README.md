# Cat Lovers - a demo react app with typescript

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## What is CatLovers

CatLovers is an app that uses the TheCatApi(https://developers.thecatapi.com/) to load various images of cats. By clicking on the cat image you can view information about the cat like it's breed and you can also add(or remove it) to your favorites list. The app also provides a list of cat breeds. You can also load cat images by breed.

### Architecture

The app is written in typescript and make use of interfaces to model the entities. I use the axios library to fetch the images, and created a simple agent component to handle axios calls. For the UI I used react-bootstrap(https://react-bootstrap.github.io/) to give it a nice look (I made it look like netflix).
For managing the state, I lifted the state up to the app component and used prop drilling to pass down the data through props. All the components are functional components.

## Learn More

For more examples of state management and different architectures check out my other repositories (I will be updating them frequently).
