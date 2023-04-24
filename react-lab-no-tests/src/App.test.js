import { render, screen } from '@testing-library/react';
import App from './App';

// This test is old, and we don't like it anymore!
test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
})