// This file stores the photo galleries for specific locations/events.
// Key = locationId (which we will add to schedule-data.ts)
// Value = Array of image paths

export const locationGalleries: Record<string, string[]> = {
  "pldt-site": [
    "/events/educational-tour/educ-tour-lunch.jpg",
    "/events/educational-tour/educ-tour-lunch.jpg",
    "/events/educational-tour/educ-tour-lunch.jpg",
  ],
  "vitro-data-center": [
    "/events/educational-tour/vitro/security.jpg",
    "/events/educational-tour/vitro/cooling-system.jpg",
  ],
  "vikings-buffet": [
    "/events/educational-tour/vikings/group-photo.jpg",
    "/events/educational-tour/vikings/food.jpg",
  ],
  "jairosoft-inc": [
    "/events/educational-tour/jairosoft/office.jpg",
    "/events/educational-tour/jairosoft/dev-team.jpg",
  ],
  "cdrrmo-office": [
    "/events/educational-tour/cdrrmo/command-center.jpg",
    "/events/educational-tour/cdrrmo/monitoring-screens.jpg",
  ],
  
  // DevFest Galleries
  "devfest-main-stage": [
    "/events/gdg-devfest/stage-talk.jpg",
    "/events/gdg-devfest/audience.jpg",
  ]
};