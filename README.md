# Make Games Players Love - PlaytestCloud Assessment

## Project Overview
You are required to develop a simple Angular application using the [DummyJSON API](https://dummyjson.com/).
You are free to use any libraries of your choice.

## Features & Requirements

### 1. Product Listing Page
- Fetch and display products using the `GET /products` endpoint.
- Display the following product details in a grid layout:
    - **Title**
    - **Price**
    - **Thumbnail**
    - **Rating**
- Include a dropdown to filter products by category (use the `GET /products/categories` endpoint).

### 2. Product Details Modal
- Clicking on a product opens a modal displaying:
    - **Title**
    - **Description**
    - **Stock**
    - **Price**
    - **Images** (use the `images` field from the API)
- Allow users to add the product to a **Favorites** list.

### 3. Favorites Page
- Create a dedicated **Favorites** page.
- Persist the favorites list locally (e.g., using LocalStorage).

## Setup & Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
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
- This implementation does not include unit tests or specific responsiveness improvements, as they were not part of the original requirements.

## License
This project is for assessment purposes only.
