const {snakeCase} = require('change-case');
export const Greeter = (name: string) => `Hello ${name}`;


enum TypeFields {
    eq = 'equals',
    ne = 'notEquals'
}

export class Parser {
  private req: any;
  private regex: RegExp =
    /(?:(?<field>[^= ]+?)\s+(?<operator>eq|ne|gt|ge|lt|le|add|sub|mul|div|mod|)\s+'?(?<value>[^' ]+)'?)/gm;

  constructor(req: any) {
    this.req = req;
  }

  getPrettyUrl() {
    const originalURL: string = this.req._ && this.req._.req ? this.req._.req.url : this.req.url;
    if (!originalURL) throw 'No Valid URL';
    const urlArray: Array<string> = originalURL.split('?');
    if (urlArray && urlArray.length !== 2) throw 'No Query found';

    return decodeURI(urlArray[1]);
  }

  findFilters() {
    let m;
    const url: string = this.getPrettyUrl();
    let regex = this.regex;
    var filters = [];
    while ((m = regex.exec(url)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    //   if(m && m.groups && m.groups.value){
    //     console.log("ffffff" , m.groups.value)
    //   }
      filters.push(m.groups);
    }
    return filters;
  }
  filtersInSnakeCase(filters: Array<any> = [] ){
    var myFilters = filters.length === 0 ? this.findFilters() : filters;
    return myFilters.map( (filter: {field: String, operator: TypeFields, value: String} ) => {
        return {
            field: snakeCase(filter.field).toUpperCase(),
            operator: (<any>TypeFields)[filter.operator],
            value: filter.value,
        }
    });
  }
}

export const parser = (req: object) => {
  return 'hallo';
};
