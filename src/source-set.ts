import { Closure } from './project'
import { callable } from './decorators'

export interface SourceSetsHandler {
  (name: string, configurationClosure: Closure<SourceSet>):void
  main(configurationClosure: Closure<SourceSet>):void
  test(configurationClosure: Closure<SourceSet>):void
}

export interface SourceSet {
  java(configurationClosure: Closure<SourceDirectorySet>):void
}

export interface PatternFilterable {
  include(pattern: string):void
  exclude(pattern: string):void
}

export interface SourceDirectorySet extends PatternFilterable {

}

interface SourcesSetHandlerImpl {
  (name: string, configurationClosure: Closure<SourceSet>):void
}

@callable("add")
class SourcesSetHandlerImpl implements SourceSetsHandler {
  add(name: string, configurationClosure: Closure<SourceSet>) {

  }

  main(configurationClosure: Closure<SourceSet>): void {
    this.add("main", configurationClosure)
  }

  test(configurationClosure: Closure<SourceSet>): void {
    this.add("test", configurationClosure)
  }
}

export function sourceSets(configurationClosure: Closure<SourceSetsHandler>) {
  configurationClosure(new SourcesSetHandlerImpl());
}
