# Book-Notes-Website

Website using openlibrary API to add Book and review for it.

# Screen capture.

Write a review of the book then click "Add book" to add.
![addingBook](https://github.com/user-attachments/assets/6e1357e9-00b2-4505-9a99-9b328606e9e4)
![homeWithBooks](https://github.com/user-attachments/assets/f8def2bd-ed22-40f1-bd57-0951113e5e0d)
![homeWithBooks2](https://github.com/user-attachments/assets/6bfc48de-de38-42ab-ba9e-159bb9539d00)
Edit review:
![edit](https://github.com/user-attachments/assets/e6e450c4-3449-4520-896c-7300956b0fdc)
![homeEdited](https://github.com/user-attachments/assets/09421748-14a8-4eeb-b49a-698c525817f5)
Delete a book review:
![delete](https://github.com/user-attachments/assets/5416276f-9f53-4418-beed-0351270c7f40)
![homeDelete](https://github.com/user-attachments/assets/58d990bf-a515-47cc-b804-a7b0632a2fa5)

---
## Requirements

For development, you will need Node.js, PostgreSQL and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/engrHarvey/Book-Notes-Website
    $ cd PROJECT_TITLE
    $ npm install

## Running the project

    $ node index.js
