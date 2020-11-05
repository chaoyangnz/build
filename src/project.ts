import { task } from './task'
import { dependencies } from './dependency'
import { repositories } from './repository'
import { sourceSets } from './source-set'

export interface Closure<T> {
  (delegate: T): void;
}

// Examples





