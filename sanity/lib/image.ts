import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/lib/types'
import { dataset, projectId } from '../env'

const builder = imageUrlBuilder({ projectId: projectId || 'not-configured', dataset })

type ImageSource = Parameters<typeof builder.image>[0]

/** Accetta anche le immagini del CMS con campi facoltativi (controllate prima con hasImage). */
export function urlFor(source: SanityImage | ImageSource) {
  return builder.image(source as ImageSource)
}
