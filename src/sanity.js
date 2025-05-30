import { createClient } from "@sanity/client";

//skapar själva klienten som vi använder för att skicka data till sanity
export const client = createClient({
  projectId: "h1nmn9gv", // Vårt projekt-ID från Sanity
  dataset: "production", // Vilket dataset vi jobbar mot
  apiVersion: "2023-01-01", // Sanity-version vi använder
  useCdn: false, // Vi använder inte Sanitys cache för att alltid få färsk data
  token: "skYtoKdclBmalqHsONDCdldqavttlXEek0Rx0Ur8KE4DKvb0bxp4ZE3PlL0I65N48Bz4VM4Z9mDsFlTgsTd24Tx1ic3YEm5TzozjNiUj5fsmahbAcA4tFhoUzRmdUaOEiNoWX2MrILYV7T5vIgcFPcOGkAspeloVjfUtta5Fx7cvvL0PDU8J" // Token för att kunna skapa/redigera inlägg från adminpanelen//token används om vi ska kunna skapa uppdatera eller ta bort data
});