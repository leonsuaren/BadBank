# BADBANK APP

> A simple app that allows you to perform the basics operations of a bank such as, making deposits, withdrawing, and checking out your balance. This App also allows you to transfer between your accounts and to other users.

>  In order to get access to the application you should first, create a user on the register view by clicking on the `register` button on the top right corner in the navigation bar and then log in, you will see the `login` button next to the `register` button. once you are in the register view, to create a user, provide a username, an email and a password, the system will evaluate whether the email is valid or not, the password should be 8 characteres long. Once the user is created you can log in into your account. Go to the login view and simple enter the email and password that you just created.

>Once your log in the system will take you to the home view, you can use the Navigation bar to go to the different views such as deposit, withdraw, balance and all-data.

>It is important to mention that the system will create a default checking account with a 100 inicial balance, this checking account will be the only checking account, there is not way to create another checking account but you can have up to 3 savings accounts. If you want to create a savings account, navigate to all-data view and click on the `Add Account` button, a modal will open, enter a inicial balance and a description of what is this saving account for, for example `To buy a car`, click on the `Add Account` button on the modal and that's it, you'll see your new savings account displayed within the all-data view. You can also delete your savings accounts, to do it, the account should be on 0 balance (Tranfer you savings balance on order to have it on 0). You can only delete a savings account, the checking account can't be deleted, remember, in order to be a Badbank costumer you will need at least one checking account with us. 

## HOW TO RUN IT?

First what you need to do is clone the repository so you can have a copy of the project on you machine.
* Open a terminal and navigate to the directory where you want to have the copy of this repository.
* Then, now run this command in the command line:         
`git clone https://github.com/leonsuaren/BadBank.git`

* Once it is on your computer go to the main directory and run: `npm install`. To install all the dependencies needed to run the front-end.

* Navigate to the back-end directory and run: `npm install`. To install all the dependencies needed to run the back-end.


* After that, you need the front-end and the back-end running in order to see the app in acction, to run the front-ent run: `npm start` in the main directory, the front-end will run on port 3000, navigate to [http://localhost:3000](http://localhost:3000). To run the back-end, navigate to the back-end directory on a different terminal and run the command `npm start`, the back-end will run on port 8080

## Technology

> This project was built using the React library and I'm using Bootstrap to style some of the components.

In future updates, this app will be refactored and I will implement a back end with