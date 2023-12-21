# Bookstore

Backend to bookstore application that allows book enthusiasts to browse, search for, purchase, and manage their
books collections, bookstore can add books, track booksales and create account for their employees. This application aims to provide an extensive libraryof books and seamless e-commerce features.

## Built With:

- JavaScript
- Node
- Express
- dotenv
- mongoose
- nodemon

## Installation

- clone the repository

```sh
git clone git@github.com:olawuwo-abideen/bookstore.git
```

- navigate to the folder

```sh
cd bookstore.git
```

## Run the app in development mode

Open a terminal window session, or the equivalent on your machine, and enter the following command to install all the
Node modules needed to run the app:

```sh
npm install
```

After doing an `npm install` enter the following `npm start` command:

```sh

npm start

```

This will start the app and set it up to listen for incoming connections on port 3000. Open up your browser of choice
and go to the url

```sh

http://localhost:3000

```

to start using the app.

## API Endpoints

The following API endpoints are available:

- BaseUrl https://localhost:3000/

- `POST /api/v1/authors` - Register an author
- `GET /api/v1/authors` - Get all authors
- `GET /api/v1/authors/:id` - Get an author
- `GET /api/v1/authors/:id/books` - Get an author book
- `PATCH /api/v1/authors/:id` - Update an author
- `DELETE /api/v1/authors/:id` - Delete an Author

- `POST /api/v1/book` - Create a book
- `GET /api/v1/books` - Get all books
- `GET /api/v1//book/:id` - Get a book
- `GET /api/book/:id/authors` - Get an author books
- `GET /api/book/:id/reviews` - Get a book reviews
- `PATCH /api/v1//book/:id` - Update a book
- `DELETE /api/v1/book/:id` - Delete an book

- `POST /api/v1/booksales` - Create a book sold
- `GET /api/v1/booksales` - Get a book sold

- `POST /api/v1/clientreviews` - Create client book review

- `POST /api/v1/clients` - Create a client
- `GET /api/v1/clients` - Get all a client
- `GET /api/v1/clients/:id` - Get all a single client
- `PATCH /api/v1/clients/:id` - Update a single client

- `POST /api/v1/employees` - Create an employee
- `GET /api/v1/employees` - Get all employees
- `GET /api/v1/employees/:id` -Get single employees
- `PATCH /api/v1/employees/:id` - Update an employees

- `POST /api/v1/stores` - Create a stores
- `GET /api/v1/stores` - Get all stores
- `GET /api/v1/stores/:id` - Get single store
- `GET /api/v1/stores/:id/books` - Get single store books
- `GET /api/v1/stores/:id/employees` - Get a store employees
- `GET /api/v1/stores/:id/booksales` - Get a store booksales
- `PATCH /api/v1/stores/:id` - Update single store

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/olawuwo-abideen/bookstore/issues).

## Authors

👤 **Olawuwo Abideen**

- GitHub: [@Olawuwo Abideen](https://github.com/olawuwo-abideen)
- Twitter: [@Olawuwo Abideen](https://twitter.com/olawuwo_abideen)
- LinkedIn: [@Olawuwo Abideen](https://www.linkedin.com/in/olawuwo-abideen/)
