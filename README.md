Real Estate Project Visualization System
Overview
This Angular application provides a user-friendly interface for visualizing real estate projects on an interactive map. The application utilizes Mapbox for map integration, Tailwind for design, and the Angular HTTP module to connect to a JSON server providing project data.

Project Scope
The focus of this project is on the front-end (UI), with the server-side logic and database not implemented. The goal is to implement components for map visualization, markers, project details, search, and filtering.

Technologies and Tools
Angular: Front-end development framework.
Tailwind: CSS framework for design and layout components.
Mapbox: Interactive map integration.
Angular HTTP module: Connecting to the data API.
Implementation
Map Visualization
Utilize Mapbox to integrate an interactive map into the application. Configure the map and its options in a dedicated Angular component.

Project Markers
Create a component representing a marker on the map. Each marker displays a preview of the project, such as an image or an icon.

Detailed Information
Clicking on a marker will display a popup or a section with detailed project information. Implement a dedicated Angular component to display this information.

Search and Filtering
Create a search component enabling users to search for projects based on location, property type, price, area, etc. Implement filters to refine search results.

Interaction and Navigation
Users can interact with the map to pan and zoom. Implement map controls to facilitate these actions using Angular features.

To up the server use
npm run server
And then
ng serve
