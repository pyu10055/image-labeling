# TensorFlow.js Image Labeling App
This project uses Google Custom Search API for image seraching, and
[TensorFlow.js](https://js.tensorflow.js) for image recognition.

## Setup Google API key

Set up a Google Custom Search Engine API
Register a new app and enable Google Custom Search Engine API here: Google Developers Console. copy the API key and create the dotenv file as following: 

src/environments/.env

```javascript
export const environment = {
  production: false,
  GOOGLE_API_KEY: "your_api_key"
};
```

## Development server

Run `ng serve --env=local` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


##Note
Due to the cross domain restriction, many of the image cannot be displayed by canvas, just use any search term if you see no results shown up.