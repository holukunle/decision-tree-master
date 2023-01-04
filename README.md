# Twitter Accounts Fraud Detection
This project is a tool for detecting fraudulent Twitter accounts using Decision tree.
The goal of the project is to determine whether a given Twitter account is operated by a human or by a bot.
To do this, the project uses Decision tree clustering to analyze the activity of the account and identify patterns that are indicative of bot behavior.
Once the analysis is complete, the project will output a prediction as to whether the account is likely to be a human or a bot.
This can be a useful tool for identifying and combating spam and other forms of online abuse on Twitter.

## Requirements
To run the frontend project, you will need [Node.js](https://nodejs.org/en/) installed on your system.

## Installation
To install the frontend project, follow these steps:

1. Clone the repository: `git clone https://github.com/ra-ens/decision-tree.git`
2. Navigate to the frontend directory: `cd decision-tree/frontend`
3. Install dependencies: `npm install`

## Usage
To start the frontend project, follow these steps:

1. Navigate to the frontend directory: `cd decision-tree/frontend`
2. Start the development server: `npm start`
3. The frontend should now be running on `http://localhost:3000`

You can use the application to detect fraudulent Twitter accounts by following these steps:

1. Choose the model to use, check `decision-tree/model` folder for pre-trained model
2. Enter the Twitter data of the account you want to check in the input fields.
3. Click the "Predict" button.
4. The application will display the results of the fraud detection analysis.

## Model Training
To train the model, we first collected a dataset of Twitter accounts that have been manually labeled as either human or bot.
This dataset was used to fit the Decision tree clustering model, which learned to differentiate between human and bot accounts based on patterns in the data.

The model was trained using a variety of features extracted from the Twitter accounts in the dataset.
These features included the frequency and content of tweets, the number of followers and followees, and the account's interaction with other users.

To train your own model you can use the `Decision_Tree.ipynb` file on this repository by providing your dataset,
you can find the dataset we used for our model on the folder `decision-tree/dataset`

When the training is successful you should export it as a `json` file to use it on the frontend project. simply follow all the steps on the `Decision_Tree.ipynb` file

## Demo
https://youtu.be/OE4vPsTg4bs
