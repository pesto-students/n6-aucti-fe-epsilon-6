# Aucti : The Auction Platform

![image](https://user-images.githubusercontent.com/25719595/133609115-79e8d341-5e4c-4e01-9018-ecc02f46d838.png)

## Introduction

Aucti is a platform for the buyers and sellers of exquisite products, antiques and rare collections.

It brings this niche domain of business into the main stream by tranforming auctions into e-commerce .This platform helps establish an ecosystem of trust which guarentees fulfillment to both buyers and sellers.

The website can be reached at :  [https://aucti-fe.netlify.app](https://aucti-fe.netlify.app)

The Ui is simple and intutive, for seamless interaction with users the website has simple pages like : landing page, search page, product page, quick links(on footer). A user can log into their account as a buyer or a seller and perform actions depending on persona like bidding,add to wishlist, add product, select bid, end auction etc.

## Local Setup

- In a suitable code editor clone the repo
  ```sh 
  git clone https://github.com/pesto-students/n6-aucti-fe-epsilon-6.git 
  ```

- Switch to the cloned repo  
  ```sh 
  cd n6-aucti-fe-epsilon-6
  ```

- Install dependencies
  ```sh
  npm install 
  ```

## Run the application locally:

```sh 
npm start 
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Test the application :

```sh 
npm test 
```

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Find the Test Coverage :

```sh
npm run coverage 
```

After running this in the terminal you will see a test coverage report. Which gives important details about the tests like.

- What percentage of statements were in the test?
- Were all scenarios in switch cases and if else covered in the tests?
- Were all the functions executed in the tests?
- What percentage of lines were tested?

## Generate an optimized build :

```sh
npm run build 
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## About the backend :

The application currently uses the functions deployed on the netliry production server. If you want to run the back end locally, we need to make changes in the api.js file and change the value of the variable baseURL to [http://localhost:9000](http://localhost:9000). Api.js is located at ```./src/redux/api.js```, on line number 5.  

If you want to add new features or create new routes on the backend, you may make changes by cloning the repo 
```sh
git clone https://github.com/pesto-students/n6-aucti-be-epsilon-6.git 
```

## Contribution
Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (```git checkout -b feature/AmazingFeature```)
3. Commit your Changes (```git commit -m 'Add some AmazingFeature'```)
4. Push to the Branch (```git push origin feature/AmazingFeature```)
5. Open a Pull Request

## Authors
Kirushan Balakrishnan & Anurag Kumar
