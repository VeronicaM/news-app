# News Dashboard 

News API based app that displays first 5 news healines from 5 countries (UK, US, FR, AU, ID)
The app is hosted [here](https://news-app-react.herokuapp.com//). 

## Requirements

To configure locally you will need to have installed on your machine:
* node *v8.12* or higher 
* npm  *v5.3.0* or higher or yarn *v1.0* or higher

## Installation
1. git clone this repository 
2. cd into the root folder 
3. run `npm install` or `yarn` to install all dependencies

## Run the project
* Run `yarn start` or `npm start` in the root of your project. This should open the project in your default browser at http://localhost:3000/ 

## Technical choices and Tradeoffs 
* **Create React App** to generate the initial structure of the app. 
  - I have made this choice for the ease of setup of React with Babel 7 config as well as all the other plugins like class-properties. 
  - It also sets up Jest and Webpack.
  ##### Tradeoffs
  - This is very fast and convinient setup for prototyping but it has a lot of unnecessary complexity 
  - If I had enough time I would do a proper setup from scratch and I would include only what it's necessary for the project.
* **Material UI** for fast and easy styling. 
   ##### Tradeoffs
  - I wouldn't use it in a production app because it creates a very deeply nested hierarchy of wrapped components 
    making it very difficult to debug the app by inspecting the DOM.  
  - Because of this deep hierarchy additional customized styling or passing of props is a lot more difficult as well.
* **News API Key** in a config file that I have added in the source code on github. 
  ##### Tradeoffs
  - In a production environment I would have probably used a backend endpoint that received the key from a process.env variable 
   to prevent it from being exposed on the client side or stored in the source code. 
* Other things I would have liked to focus more on are design and responsiveness, image compression, lazy loading of images and test coverage  
