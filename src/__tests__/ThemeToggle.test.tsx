import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useTheme } from 'next-themes';
import ThemeToggle from '../components/ThemeToggle';

jest.mock('next-themes', () => {
  return {
    useTheme: jest.fn(),
  };
});

describe('ThemeToggle', () => {
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));

  it("should call setTheme with 'light' when Light option is clicked.", async () => {
    const user = userEvent.setup();
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ setTheme });

    const { getByText, getByRole } = render(<ThemeToggle />);
    const button = getByRole('button');
    await user.click(button);

    expect(getByRole('menuitem', { name: 'Light' })).toBeInTheDocument();

    await user.click(getByText('Light'));
    expect(setTheme).toHaveBeenCalledWith('light');
  });

  it("should call setTheme with 'dark' when Dark option is clicked.", async () => {
    const user = userEvent.setup();
    const setTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({ setTheme });

    const { getByText, getByRole } = render(<ThemeToggle />);
    const button = getByRole('button');
    await user.click(button);

    expect(getByRole('menuitem', { name: 'Dark' })).toBeInTheDocument();

    await user.click(getByText('Dark'));
    expect(setTheme).toHaveBeenCalledWith('dark');
  });
});
