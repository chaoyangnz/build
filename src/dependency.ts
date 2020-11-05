import { Closure } from './project'
import { callable } from './decorators'

export type DependencyNotation = {
  group: string,
  artifact: string
  version: string
} | string

export interface DependencyHandler {
  add(configurationName: string, dependencyNotation: DependencyNotation):void
  (configurationName: string, dependencyNotation: DependencyNotation):void
}

@callable("add")
class DependencyHandlerImpl implements DependencyHandler {

  add(configurationName: string, dependencyNotation: DependencyNotation): void {
    console.log("add a dependency")
  }
}

interface DependencyHandlerImpl {
  (configurationName: string, dependencyNotation: DependencyNotation): void
}

export function dependencies(configureClosure: Closure<DependencyHandler>) {
  configureClosure(new DependencyHandlerImpl());
}



