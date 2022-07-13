import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import citiesResponseMock from './utils/mocks';

test('renders correctly', () => {
  const mockStore = configureStore();
  let store = mockStore(citiesResponseMock)

  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Go to Favorites/i);
  expect(linkElement).toBeInTheDocument();
});
