import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import type { SanityImage } from '@/lib/types'

/** Immagine caricata nel CMS, ritagliata dal servizio immagini di Sanity. */
export function SanityPicture({
  image,
  width,
  height,
  sizes,
  priority,
  fallbackAlt = '',
}: {
  image: SanityImage
  width: number
  height: number
  sizes: string
  priority?: boolean
  fallbackAlt?: string
}) {
  const src = urlFor(image).width(width).height(height).fit('crop').auto('format').url()
  return <Image src={src} alt={image.alt || fallbackAlt} fill sizes={sizes} priority={priority} />
}

export const hasImage = (image?: SanityImage): image is SanityImage => Boolean(image?.asset?._ref)
