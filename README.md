This is the repo for the RGB Weather Cube control webpage. This webpage allows users to control the location their Arduino is displaying the weather from, and saves their preference. 

The most relevant code is under pages/index.tsx and pages/api/[hello].tsx.
pages/index.tsx is the page that the user interacts with. When a user submits to this page, it triggers a POST request to the API located in pages/api/[hello].tsx. The [hello].tsx page is dynamically routed, so all pages of the form https://rgb-led-app.herokuapp.com/api/something go to this page. In response to the POST request from the front end, the API updates or creates an entry in the linked MongoDb. In response to a GET request from the Arduino client, the API queries the linked MongoDb for the record and send the record back as the response. If the record is not found, a 404 error response is sent instead.
