# HYFIX Website Backend

This is the backend (Express server built with Node.js) to the hyfix.ai website. More information about the project is at the [frontend](https://github.com/MicaHorton/hyfix.ai/tree/dev) repository.

## To Do
current: cleanup url names (and create specification file)

- create OpenAPI specification file
    - rethink endpoints?
- use insommia to write unit tests
- use react-admin to create admin console
- hypermedia 
- compared to documentation


# Endpoints


GET /products/
POST /products/
GET /products/category
GET /products/{id}
POST /products/{id}
DELETE /products/{id}

POST /users/login

GET /payment/public-key
POST /payment/create-payment-intent