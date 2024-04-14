# Final-Project

## Project Description: 
The laundry portal allows users to browse and select laundry services such as Wash & Dry and Dry Cleaning. It provides a user-friendly interface for adding items to the cart, viewing the cart total, and initiating a checkout process. The portal integrates with a JSON database (db.json) to fetch service data dynamically and implements essential features for managing orders, users, payments, and reviews.

# Setup

Run this command to get the backend started:

```console
$ json-server --watch db.json
```

Test your server by visiting this route in the browser:

[http://localhost:3000/services](http://localhost:3000/services)

Then, open the `index.html` file on your browser to run the application.

Write your code in the `src/index.js` file. The base URL for your API will be
[http://localhost:3000](http://localhost:3000).

 ## Project MVP:

### Display Services: 
Users can view available laundry services, including Wash & Dry and Dry Cleaning, with detailed item information and prices.
### Add to Cart: 
Users can add items to the cart by clicking the "Add to Cart" button associated with each service item.
### Cart Management: 
The portal manages the cart, calculates the total price, and allows users to remove items from the cart.
### Checkout Functionality:
 Although not fully implemented, the checkout button provides a placeholder for future checkout functionality.
### JSON Integration:
 The project successfully integrates with a JSON database (db.json) to fetch and display service data dynamically.
### Public API Used: 
The project does not use a public API directly but simulates API data using a local JSON server (json-server) with the db.json file.
