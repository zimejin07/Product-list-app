## Project Overview
A simple Angular application using the [DummyJSON API](https://dummyjson.com/).

## Features

### 1. Product Listing Page
- Fetches and displays products using the `GET /products` endpoint.
- Displays the following product details in a grid layout:
    - **Title**
    - **Price**
    - **Thumbnail**
    - **Rating**
- Includes a dropdown to filter products by category (use the `GET /products/categories` endpoint).

### 2. Product Details Modal
- Clicking on a product opens a modal displaying:
    - **Title**
    - **Description**
    - **Stock**
    - **Price**
    - **Images** (use the `images` field from the API)
- Allows users to add the product to a **Favorites** list.

### 3. Favorites Page
- A dedicated **Favorites** page.
- It persist the favorites list locally using LocalStorage.

## Setup & Installation
1. Clone the repository:
   ```sh
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`.

## Technologies Used
- **Angular 19** (Framework)
- **TypeScript** (Language)
- **DummyJSON API** (Data source)
- **LocalStorage** (For persisting favorites)

## Notes
- This implementation does not include unit tests or specific responsiveness improvements.

## License
This project is for experimentation purposes only.
