# Toy House

## Description  
**Toy House** is a pet-project online toy store.  
The project is built with **Next.js** and demonstrates key features of a modern e-commerce application: product catalog, shopping cart with total calculation, order form, as well as additional interactive elements and advanced UX.

Live demo:  
[Toy House on Vercel](https://toy-house-git-main-ivannas-projects-7ab89dcc.vercel.app/)

---

## Features  
- **Product catalog**: browse the list of toys, add items to the cart, navigate to the cart  
![Catalog Animation](/public/readme/catalogyAnim.gif)

- **Product page**: detailed page for each product 
![Product Card Image](/public/readme/cardProduct.png) 

- **Shopping cart**:  
  - add / remove items  
  - calculate total **including discounts and shipping**  
  - final total amount  
  - order form directly on the cart page  
  - **alert** if the user tries to submit an empty cart  
  - **separate confirmation page** after a successful order  
![Cart Animation](/public/readme/cartAnim.gif)

- **Form validation** (required fields, correct input)  
- **Enhanced UI / UX**:  
  - animations and visual effects  
  - sliders / carousels (Swiper, react-motion-slider)  
  - infinite slider  
  - fixed cart during scrolling (stops at the end of the block)  
  - accordion (collapsible sections)  
![Scrolling Demo](/public/readme/scroll.gif)

- **Responsive design**  
- **Interactive map** (react-leaflet + dynamic import in Next.js)  
- **Site pages and blocks**:  
  - "About Us"  
  - "Catalog"  
  - "Feedback"  
  - "Contacts"  
  - individual product pages  
  - separate cart page with order form  
- **Hero section**  
![Hero Image](/public/readme/hero.png)  

- **New & Soon section**  
![New In Soon Animation](/public/readme/newInSoon.gif)
---

## Tech stack
- **Frontend**: Next.js (App Router), React  
- **UI / UX**: CSS / SCSS / Sass, animations, sliders, carousels  
- **Custom hooks**: `useEventListener`, `useWindowScroll`, `useWindowSize`  
- **Libraries**: react-leaflet, leaflet, react-hook-form, react-input-mask-next, swiper, @types/react-motion-slider  
- **Hosting**: Vercel  
- **TypeScript** and typings via @types/* 

**Dependencies**:  
```json
"dependencies": {
  "@types/react-motion-slider": "^0.4.13",
  "leaflet": "^1.9.4",
  "next": "15.2.4",
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "react-hook-form": "^7.61.1",
  "react-input-mask-next": "^3.0.0-alpha.12",
  "react-leaflet": "^5.0.0",
  "sass": "^1.86.3",
  "scss": "^0.2.4",
  "swiper": "^11.2.6"
},
"devDependencies": {
  "@types/leaflet": "^1.9.17",
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19",
  "@types/react-input-mask": "^3.0.6",
  "typescript": "^5"
}
```

**Local setup**:
```bash
# 1. Clone the repository
git clone https://github.com/Ivanna-Kutsovol/ToyHouse.git
cd ToyHouse

# 2. Install dependencies
npm install

# 3. Run the project
npm run dev

# 4. Open in browser
http://localhost:3000
```

## Author  
**Ivanna Kutsovol**  
GitHub: [@Ivanna-Kutsovol]([https://github.com/Ivanna-Kutsovol)
