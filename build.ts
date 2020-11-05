import { repositories } from './src/repository'
import { dependencies } from './src/dependency'
import { task } from './src/task'
import { sourceSets } from './src/source-set'

repositories(_ => {
  _.mavenCentral();
})

dependencies(_ => {
  _("implementation", {group: "", artifact: "", version: "1.2"})
})

task("build", _ => {
  console.log(111)
  _.dependsOn("compile")
  _(() => {

  })
})

sourceSets(_ => {
  _.main(_ => {
    _.java(_ => {
      _.exclude("target")
    })
  })
})
