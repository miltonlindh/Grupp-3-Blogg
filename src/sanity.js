import { createClient } from '@sanity/client'
//skapar klienten vi använder för att prata med sanity, 
export const client = createClient({
    projectId: 'h1nmn9gv',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: 'true'
})