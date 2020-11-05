import { Closure } from './project'
import { callable } from './decorators'

export interface TaskHandler {
  dependsOn(name: string):void
  doFirst(action: Closure<any>):void
  doLast(action: Closure<any>):void
  (action: Closure<any>):void
}

@callable("doLast")
class TaskHandlerImpl implements TaskHandler {

  dependsOn(name: string): void {
  }

  doFirst(action: Closure<any>): void {
  }

  doLast(action: Closure<any>): void {
    console.log(222)
  }
}

interface TaskHandlerImpl {
  (action: Closure<any>):void
}

export function task(name: string, configureClosure: Closure<TaskHandler>) {
  const taskHandler = new TaskHandlerImpl();
  configureClosure(taskHandler)
}
