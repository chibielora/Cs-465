# CS-465 - Full Stack Application

## Architecture

### Compare and contrast the types of frontend development you used in your full stack project, including Express HTML, JavaScript, and the single-page application (SPA).

In this full stack project, I employed various frontend technologies such as Express HTML, TypeScript, and a single-page application (SPA) framework to create an immersive user experience. Express HTML allowed for dynamic content generation on the server-side while seamlessly integrating with client-side TypeScript for interactivity.

The SPA architecture enables users to move fluidly between different sections of the website without constant page reloads, which in turn enhances user engagement and overall performance. By loading only necessary data asynchronously as users interact with elements on the page, we can achieve a more responsive interface that mimics desktop application transitions.

### Why did the backend use a NoSQL MongoDB database?

The choice of MongoDB database over traditional SQL databases comes down to flexibility and scalability. MongoDB's schema-less structure accommodates rapidly changing data requirements better than relational schemas from SQL databases.

Furthermore, MongoDB simplifies hierarchical data storage by allowing nested objects within documents instead of spreading them across multiple tables linked by foreign keys. This design choice streamlines querying operations significantly while reducing performance impacts.

## Functionality

### How is JSON different from Javascript and how does JSON tie together the frontend and backend development pieces? Provide instances in the full stack process when you refactored code to improve functionality and efficiencies, and name the benefits that come from reusable user interface (UI) components.

While both share similar syntax conventions such as key-value pairs enclosed within curly braces, they serve distinct purposes within the system. JavaScript is a programming language that executes logic on the client-side to manipulate DOM elements or interact with APIs dynamically. On the other hand, JSON primarily focuses on serializing and deserializing structured data into strings in order to facilitate seamless communication between server and client. During initial implementation of CRUD operations I identified redundant validation checks scattered across multiple route handlers leading to code duplication. To mitigate this issue, I consolidated input validation logic into reusable middleware functions injected before processing requests at specific routes, promoting consistency across components while centralizing error handling.

## Testing

### Methods for request and retrieval necessitate various types of API testing of endpoints, in addition to the difficulties of testing with added layers of security. Explain your understanding of methods, endpoints, and security in a full stack application.

Methods refer to the HTTP calls used to interact with endpoints in a RESTful API, like GET, POST, PUT, and DELETE, and each method serves a specific purpose. GET retrieves data from the server without modifying it, POST creates new resources on the server, in this case to create trips; PUT updates existing resources entirely, like we used to edit previously added trips; DELETE removes resources from the server.

Endpoints are URLs that represent specific resources or functionalities within an API, serving as entry points for interacting with different parts of an application's backend. For example,

- /trips endpoint to retrieve available trips;
- /news endpoint to create new informational pages (not implemented);
- /login endpoint for user authentication after a user is already registered.

## Reflection

### How has this course helped you in reaching your professional goals? What skills have you learned, developed, or mastered in this course to help you become a more marketable candidate in your career field?

By diving into the nuances of HTTP and endpoint management, I have acquired a better understanding of how the system interactions between frontend and backend can be done with TypeScript. I believe this will be invaluable to prove my technical proficiency along with the ability to navigate larger infrastructures in the future.

In addition, by immersing myself in encryption protocols like SSL/TLS and authentication like JWT tokens or Crypto - which I must say, was quite difficult to tackle considering the Full Stack Guide provided was quite old and Crypto has been deprecated since 2018 - I solidified my knowledge while reading the book provided for this class. Overall, I've gained a wide range of problem-solving skills that can be quite helpful for debugging and dealing with deprecated assets.
