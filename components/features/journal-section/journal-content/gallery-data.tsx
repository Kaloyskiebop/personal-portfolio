// This file stores the photo galleries for specific locations/events.
// Key = locationId (which we will add to schedule-data.ts)
// Value = Array of image paths

export const locationGalleries: Record<string, string[]> = {
  "pldt-site": [
    "/events/educational-tour/pldt/pldt1.jpg",
    "/events/educational-tour/pldt/pldt2.jpg",
    "/events/educational-tour/pldt/pldt3.jpg",
    "/events/educational-tour/pldt/pldt4.jpg",
    "/events/educational-tour/pldt/pldt5.jpg",
  ],
  "vitro-data-center": [
    "/events/educational-tour/vitro/vitro3.jpg",
    "/events/educational-tour/vitro/vitro3.jpg",
    "/events/educational-tour/vitro/vitro3.jpg",
  ],
  "vikings-buffet": [
    "/events/educational-tour/vikings/vikings1.jpg",
    "/events/educational-tour/vikings/vikings2.jpg",
  ],
  "jairosoft-inc": [
    "/events/educational-tour/jairosoft/jairosoft1.jpg",
    "/events/educational-tour/jairosoft/jairosoft2.jpg",
    "/events/educational-tour/jairosoft/jairosoft3.jpg",
    "/events/educational-tour/jairosoft/jairosoft4.jpg",
    "/events/educational-tour/jairosoft/jairosoft5.jpg",
  ],
  "cdrrmo-office": [
    "/events/educational-tour/cdrrmo/cdrrmo1.jpg",
    "/events/educational-tour/cdrrmo/cdrrmo2.jpg",
    "/events/educational-tour/cdrrmo/cdrrmo3.jpg",
  ],
  
  // DevFest Galleries
  "devfest-main-stage": [
    "/events/gdg-devfest/stage-talk.jpg",
    "/events/gdg-devfest/audience.jpg",
  ]
};