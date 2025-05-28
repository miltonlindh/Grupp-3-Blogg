import { createClient } from "@sanity/client";

//skapar själva klienten som vi använder för att skicka data till sanity
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, //vårat id för projektet, hämtas från .env filen
  dataset: import.meta.env.VITE_SANITY_DATASET, //vilket dataset vi jobbar mot
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION, //sanity versionen vi använder
  useCdn: import.meta.env.VITE_SANITY_USE_CDN === 'true', //useCdn true som gör att vi använder sanitys cache
  token: import.meta.env.VITE_SANITY_TOKEN //token används om vi ska kunna skapa uppdatera eller ta bort data
});