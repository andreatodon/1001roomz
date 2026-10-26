'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { convertToBilingualAction } from './sanity/actions/convertToBilingual'
import { loadStarterContent } from './sanity/actions/loadStarterContent'
import { isPreviewStudio } from './sanity/lib/studioEnv'
import { apiVersion, dataset, projectId } from './sanity/env'
import { schemaTypes, singletonTypes } from './sanity/schemaTypes'
import { structure } from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: '1001 Rooms',
  basePath: '/studio',
  projectId: projectId || 'not-configured',
  dataset,
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
    // I documenti unici non compaiono nel menu "Crea nuovo".
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) => {
      // Nelle anteprime dei branch lo Studio non pubblica niente: il dataset è quello del sito vero.
      if (isPreviewStudio()) return actions.filter(({ action }) => action === 'discardChanges')
      if (!singletonTypes.has(schemaType)) return actions
      const kept = actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
      return schemaType === 'homePage' ? [convertToBilingualAction, loadStarterContent, ...kept] : kept
    },
  },
})
