import { Greeter, parser, Parser } from '../index';
test('My Greeter', () => {
  expect(Greeter('Carl')).toBe('Hello Carl');
});

test('parser Test', () => {
  expect(parser({ name: 'Carl' })).toBe('hallo');
});

it('Pretty URL', () => {
  const req = { url: "/Customers?$filter=agiBrandSCOR_KUT%20eq%20true%20and%20agiWebshopCustomer_KUT%20eq%20%271%27'" };
  const obj = new Parser(req);
  expect(obj.getPrettyUrl()).toBe("$filter=agiBrandSCOR_KUT eq true and agiWebshopCustomer_KUT eq '1''");
  // expect(obj.getPrettyUrl()).toBe("pretty " + JSON.stringify(req));
});
it('filters in Snake Case', () => {
  const req = { url: "/Customers?$filter=agiBrandSCOR_KUT%20eq%20true%20and%20agiWebshopCustomer_KUT%20eq%20%271%27'" };
  const obj = new Parser(req);
  expect(obj.filtersInSnakeCase()[1].field).toBe("AGI_WEBSHOP_CUSTOMER_KUT");
});
