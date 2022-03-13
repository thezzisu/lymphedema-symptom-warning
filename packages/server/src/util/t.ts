import { Static, TSchema } from '@sinclair/typebox'

export type W<S extends TSchema> = { Body: Static<S> }
