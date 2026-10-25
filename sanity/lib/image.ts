import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId: projectId || 'not-configured', dataset })

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
