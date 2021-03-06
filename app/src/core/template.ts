import * as Handlebars from 'handlebars'

export class CodeTemplate {
  template:Handlebars.TemplateDelegate
  constructor(template:string) {
    // register template helpers
    Handlebars.registerHelper('input', function (this:Handlebars.HelperDelegate,id:string) {
      return (<any>this).inputs[id]
    });
    Handlebars.registerHelper('output', function (this:Handlebars.HelperDelegate,id:string) {
      return (<any>this).outputs[id]
    });


    Handlebars.registerHelper('columnNames', function (this:Handlebars.HelperDelegate,obj:any) {
      let val = obj
      console.log(val)
      let retVal:string = [...val.matchAll(/F\.col\([\'"](.*?)[\'"]\)/g)].map( x => x[1]).join(", ")
      return new Handlebars.SafeString(retVal)
    });

    Handlebars.registerHelper('json', function (this:Handlebars.HelperDelegate,obj:any) {
      // pretty print and change false to False to match the python dict format
      return new Handlebars.SafeString(
        JSON.stringify(
          obj,
          (k,v) => 
            typeof(v)==="boolean"? (v ?"True":"False") : v,
          2
        )
      )
    });

    this.template = Handlebars.compile(template,{noEscape: true})
  }
  render(values = {}) {
    return this.template(values)
  }
}