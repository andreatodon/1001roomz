import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: projectId || 'not-configured',
  dataset,
  apiVersion,
  useCdn: true,
})
