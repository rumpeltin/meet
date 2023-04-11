# MEET

My objective is to build a serverless, progressive web application (PWA) with React using a
test-driven development (TDD) technique. The application will use the Google
Calendar API to fetch upcoming events.

## Features and Requirements

### Key Features:
- Filter events by city
- Show/hide event details
- Specify number of events
- Use the app when offline
- Add an app shortcut to the home screen
- View a chart showing the number of upcoming events by city

### User Stories:
1. As a **user**, I should be able to **filter** the events by city, so that I can *see all events in a specific city*.
1. As a **user**, I should be able to **expand/collaps** an event, so that I can *show/hide all details for a specific event*.
1. As a **user**, I should be able to **specify** the number of events, so that I can *see a specified number of events on each page*. 
1. As a **user**, I should be able to **use the app offline**, so that I can *see its content when I have no internet connection*.
1. As a **user**, I should be able to **visualise** the events per city, so that I *know which city has upcoming events*.

### Technical Requirements:
- must be a React application
- ust be built using the TDD technique
- must use the Google Calendar API and OAuth2 authentication flow
- must use serverless functions (AWS lambda is preferred) for the authorization server
instead of using a traditional server
- must be hosted in a Git repository on GitHub
- must work on the latest versions of Chrome, Firefox, Safari, Edge, and Opera, as well
as on IE11
- must display well on all screen sizes (including mobile and tablet) widths of 1920px
and 320px
- must pass Lighthouse’s PWA checklist
- must work offline or in slow network conditions with the help of a service worker
- users must be able to install the app on desktop and add the app to their home screen on
mobile
- must be deployed on GitHub Pages
- API call must use React axios and async/await
- must implement an alert system using an OOP approach to show information to the
user
- must make use of data visualization (recharts preferred)
- must be covered by tests with a coverage rate >= 90%
- must be monitored using an online monitoring tool

### Other Information
SEVERLESS: this app will make use of serverless technology to..
- avoid backend maintenance
- make it easy to scale
- always be available
- avoid any cost for idle time
- allow for authorization (AWS Lambda)
