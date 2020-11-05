import { Closure } from './project'

export interface RepositoryDefinition {
  id: string
}

export interface RepositoryHandler {
  mavenCentral(): void;
}

class RepositoryHandlerImpl implements RepositoryHandler {
  mavenCentral(): void {
  }
}

export function repositories(configureClosure: Closure<RepositoryHandler>) {
  configureClosure(new RepositoryHandlerImpl())
}
