/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

/* UI Testing */
test('list exists', () => {
  render(<App />);
  
  // Get all of the list elements and remove buttons, here we try various queries
  // can use 'getByText' to search for a given string, returns error if multiple or no matches found
  const elem1 = screen.getByText('List item 1');
  // can use 'queryByText' to search for a given string, returns null if not found, and error if found several times
  const elem2 = screen.queryByText('List item 2');
  // can use 'queryAllByText' to search for a given string, returns a list of all occurences, or null if not found
  const elem3 = screen.queryAllByText('Remove');

  // Assertions
  // expect elem1 to be in the document (redundant bc getByText would have already thrown an error if it wasn't)
  expect(elem1).toBeInTheDocument();
  // expect elem2 to be in the document (not redundant bc queryByText won't auto throw an error if not found)
  expect(elem2).toBeInTheDocument();
  // expect elem3 to not be null 
  expect(elem3).not.toBeNull();

  // can also verify elements have certain styles associated
  expect(elem2).toHaveStyle('display: list-item');
});


/* Event Testing */
test('add item', () => {
  render(<App />);

  // can assign test IDs to different elements to make them easier to find in testing
  const textfield = screen.getByTestId("new_item_text");
  const submit_btn = screen.getByTestId("item_submit");

  // can simulate user events/interactions with elements to see how they respond, here we add "Another item" to our list
  userEvent.type(textfield, "Another item");
  userEvent.click(submit_btn);

  // try to pull the new list item from the screen, throwing an error if not present
  const elem4 = screen.getByText("Another item");

  // verify elem4 is in the document and styled appropriately
  expect(elem4).toBeInTheDocument();
  expect(elem4).toHaveStyle('display: list-item');
});

test('remove item', () => {
  render(<App />);

  // can chain together queries to get more specific elements
  // here we get the remove button for the first list item by first finding it, then finding the button element
  const remove_btn = screen.getByText("List item 1").getElementsByTagName("button")[0];

  // simulate a click of the remove_btn
  userEvent.click(remove_btn)

  // try to find elem1
  const elem1 = screen.queryByText('List item 1')
  
  // expect that elem1 is no longer displayed on the screen
  expect(elem1).toBeNull();
});


/* Arbitrary Tests */
test('true is truthy', () => {
  expect(true).toBeTruthy();
});

test('false is falsy', () => {
  expect(false).toBeFalsy();
});

test('numbers do number things', () => {
  expect(3).toBe(3);
  expect(3).toEqual(3);
  expect(3).toBeGreaterThan(2);
  expect(3).toBeLessThan(4);
});


/* Basic Unit Test */
const greeting = (name) => {
  return "Hello, " + name + "!";
}
test('function_greeting', () => {
  const val = greeting("world");
  expect(val).toBe("Hello, world!");
})


/* Basic Integration Test */
const mult = (x, y) => {
  return x * y;
}

const pow = (x, exp, iters) => {
  for (var i = 0; i < iters; i++) {
    x = mult(x, x);
  }
  return x;
}

test('pow', () => {
  // Compute ((3^2)^2)^2
  const val = pow(3, 2, 3);
  expect(val).toBe(6561);
});


/* Mock Functions */
const call_api = (value, api) => {
  for (var i = 0; i < 10; i++) {
    api(value);
  }
}

test("prep for api", () => {
  const fake_api = jest.fn();
  call_api("Hello", fake_api);
  expect(fake_api).toHaveBeenCalledTimes(10);
});