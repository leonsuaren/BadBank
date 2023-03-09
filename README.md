<div align="center" width="100%">
  <img src='/public/BadBank.png' />
</div>

# BADBANK APP

> A simple app that allows you to perform the basic operations of a bank such as making deposits, withdrawing, and checking out your balance. This App also allows you to transfer between your accounts and to other users.

> To get access to the application you should first, create a user on the register view by clicking on the `register` button on the top right corner in the navigation bar and then log in, you will see the `login` button next to the `register` button. once you are in the register view, to create a user, provide a username, an email, and a password, and the system will evaluate whether the email is valid or not, the password should be 8 characters long, and could be letters or numbers. Once the user is created you can log in to your account. Go to the login view and simply enter the email and password that you just created.

>Once your log in the system will take you to the home view, you can use the Navigation bar to go to the different views such as deposit, withdraw, balance,  all-data, and transfer center.

>It is important to mention that the system will create a default checking account with a 100 initial balance, this checking account will be the only checking account, there is no way to create another checking account but you can have up to 3 savings accounts. 

>If you want to create a savings account, navigate to all-data view and click on the `Add Account` button, a modal will open, enter an initial balance and a description of what is this saving account for, for example, `buy a car`, click on the `Add Account` button on the modal and that's it, you'll see your new savings account displayed within the all-data view. You can also delete your savings accounts, to do it, the account should be on 0 balance (Transfer your savings account's balance to have it on 0). You can only delete a savings account, the checking account can't be deleted, remember, to be a Badbank customer you will need at least one checking account with us. 

>You can transfer between your accounts or to other customers' accounts as many times as you want. To do it, go to the `Transfer Center` button located in the Navigation bar, and a modal will be displayed. To transfer between your accounts you need at least two accounts, otherwise, the `Transfer between accounts` button will be disabled (create a savings account to perform this operation). To transfer between customers, click on the `Transfer to another person` button in the `Transfer center`, all you need to do is provide the email of the customer you want to send money, this customer must have an account with Badbank to receive the money, the system will evaluate whether the email is a valid user or not if the email is a valid customer you can provide the amount you want to transfer, if the email is not a valid customer, the system won't let you continue.

>You can also, give feedback on what you think about the app, a feedback button will appear on the left side of the app, and once you provide feedback you won't see it again.

## HOW TO RUN IT?
### Option One: Run the APP locally 

>With this option, the app will run locally on your computer, which means that it will run on a local port and it will establish a local connection with a MongoDB server, to see this app in action you will need to have a MongoDB server installed on your computer, please make sure you have a MongoDB server up an running on the default port `27017`. Ok, let's get into it.

First, what you need to do is clone the repository so you can have a copy of this project on your machine.

* Open up a terminal and navigate to the directory where you want to have a copy of this repository.

* Then, run this command in the command line: `git clone https://github.com/leonsuaren/BadBank.git`

* Once it is on your computer navigate to the main directory of the app on a terminal and run the command: `npm install`. To install all the dependencies needed to run the back end.

* Now, navigate to the client directory on a terminal and run the command: `npm install`. To install all the dependencies needed to run the front end.

* After that, go back to the main directory on your terminal and run the command: `npm start`, open up a browser, and navigate to [http://localhost:8080](http://localhost:8080). The App will run.

### Option Two: Run the APP with a click:

The app is deployed in Heroku and connected to the MongoDB Atlas Cloud services.

* Navigate to [Badbank App](https://leonsuarezfullstackbankingapp.herokuapp.com/)

## Technology

> This project was built using the React library and I'm using Bootstrap to style some of the components.

In future updates, this app will be refactored and I will implement a back end with