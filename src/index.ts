import { snakeCase } from 'change-case';

enum TypeFields {
  eq = 'equals',
  ne = 'notEquals',
  contains = 'contains',
}

interface ParserResult {
  field: string;
  operator: TypeFields;
  value: string;
}

class Parser {
  private req: any;
  private regex: RegExp =
    /(?:(?<field>[^= ()]+)\s+(?<operator>eq|ne|gt|ge|lt|le|add|sub|mul|div|mod)\s+'?(?<value>true|false|[^&$' ()]+)'?|(?<operator>contains)\((?<field>[^,()]+),\s*'(?<value>[^']+)'\))/gim;

  constructor(req: any) {
    this.req = req;
  }

  getPrettyUrl(): string {
    const req = this.req._ ? this.req._.req : this.req;
    const originalURL: string = req.url || req.originalURL;
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

  filtersInSnakeCase(filters: any[] = []): ParserResult[] {
    const myFilters = filters.length === 0 ? this.findFilters() : filters;
    return myFilters.map((filter: { field: string; operator: TypeFields; value: string }) => {
      const enumVal: TypeFields = (<any>TypeFields)[filter.operator];
      return {
        field: snakeCase(filter.field).toUpperCase(),
        operator: enumVal,
        value: filter.value,
      };
    });
  }
}

export { Parser };
export type { ParserResult };
