import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RequestApiKey from '../components/RequestApiKey';

jest.mock('../helpers/createApiKey', () => ({
  createApiKey: jest.fn(() => Promise.resolve('my-api-key')),
}));

describe('RequestApiKey', () => {
  it('should render the component', () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <RequestApiKey />
    );
    const heading = getByText(/Request Your API Key/i);
    const input = getByPlaceholderText(
      /Request an API key to display it here/i
    );
    const button = getByRole('button', { name: /Request key/i });

    expect(heading).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display the API key when the button is clicked', async () => {
    const user = userEvent.setup();
    const { getByPlaceholderText, getByRole } = render(<RequestApiKey />);
    const input = getByPlaceholderText(
      /Request an API key to display it here/i
    );
    const button = getByRole('button', { name: /Request key/i });
    expect(button).not.toBeDisabled();

    await user.click(button);

    expect(button).toBeDisabled();
    expect(input).toHaveAttribute('readonly');

    await waitFor(() => expect(input).toHaveValue('my-api-key'));
  });
});
