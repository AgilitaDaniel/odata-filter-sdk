// const {snakeCase} = require('change-case');
import { snakeCase } from 'change-case';
export const Greeter = (name: string) => `Hello ${name}`;

enum TypeFields {
  eq = 'equals',
  ne = 'notEquals',
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
    if (!originalURL) throw new Error('No Valid URL');
    const urlArray: string[] = originalURL.split('?');
    if (urlArray && urlArray.length !== 2) throw new Error('No Query found');

    return decodeURI(urlArray[1]);
  }

  findFilters() {
    // let m;
    const url: string = this.getPrettyUrl();
    const regex = this.regex;
    const filters = [];
    while (true) {
      const m = regex.exec(url);
      if (m === null) {
        break;
      }
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      filters.push(m.groups);
    }
    return filters;
  }
  filtersInSnakeCase(filters: any[] = []) {
    const myFilters = filters.length === 0 ? this.findFilters() : filters;
    return myFilters.map((filter: { field: string; operator: TypeFields; value: string }) => {
      return {
        field: snakeCase(filter.field).toUpperCase(),
        operator: [filter.operator] as any,
        value: filter.value,
      };
    });
  }
}

export const parser = (req: object) => {
  return 'hallo';
};
