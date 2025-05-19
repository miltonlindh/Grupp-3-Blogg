import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: 'h1nmn9gv',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: 'true'
})