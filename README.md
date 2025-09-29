# URL Shortener

A simple Node.js and Express-based URL shortener web app. Users can shorten long URLs, use custom aliases, track click counts, and export all data as CSV.

---

## Features

- Shorten long URLs with auto-generated or custom aliases
- Redirects and tracks click counts for each short URL
- Export all URL data as CSV
- Simple web interface with modern styling

---
## Getting Started

### Prerequisites
- Node.js (v14 or newer recommended)

### Installation
1. Clone or download this repository.
2. Install dependencies:
```
npm install
```
   
4. Start the server:
```
node server.js
```
   
6. Open your browser and go to [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
url-shortener/
├── package.json
├── server.js
├── urls.json         # Stores URL data
├── public/
│   ├── index.html    # Main web page
│   ├── styles.css    # CSS styling
```

---

## Usage
- Enter a long URL and (optionally) a custom alias, then click "Shorten".
- Use the generated short URL to redirect to the original.
- Click "Export CSV" to download all URL data.

---

## Dependencies
- express
- body-parser
- shortid
- cors
