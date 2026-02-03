import { Parser } from '../index';

it('Pretty URL', () => {
  const req = { url: "/Customers?$filter=agiBrandSCOR_KUT%20eq%20true%20and%20agiWebshopCustomer_KUT%20eq%20%271%27'" };
  const obj = new Parser(req);
  expect(obj.getPrettyUrl()).toBe("$filter=agiBrandSCOR_KUT eq true and agiWebshopCustomer_KUT eq '1''");
  // expect(obj.getPrettyUrl()).toBe("pretty " + JSON.stringify(req));
});
it('filters in Snake Case', () => {
  const req = { url: "/Customers?$filter=agiBrandSCOR_KUT%20eq%20true%20and%20agiWebshopCustomer_KUT%20eq%20%271%27'" };
  const obj = new Parser(req);
  expect(obj.filtersInSnakeCase()[1].field).toBe('AGI_WEBSHOP_CUSTOMER_KUT');
});

it('filters contains in Snake Case', () => {
  const req = {
    url: '/Customers?$filter=agiBrandSCOR_KUT%20eq%20true%20and%20agiWebshopCustomer_KUT%20eq%20%271%27%20contains(agiNewCustomer,%27abcde%27)%20ne%20%271%27',
  };
  const obj = new Parser(req);
  const containsFilter = obj.filtersInSnakeCase()[2];
  expect(containsFilter.field).toBe('AGI_NEW_CUSTOMER');
  expect(containsFilter.operator).toBe('contains');
  expect(containsFilter.value).toBe('abcde');
});

it('fails to filter due to invalid url', () => {
  const req = { url: undefined };
  const obj = new Parser(req);
  expect(() => obj.filtersInSnakeCase()).toThrow();
});
