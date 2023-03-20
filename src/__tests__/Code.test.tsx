import { render, cleanup } from '@testing-library/react';
import Code from '../components/Code';
import '@testing-library/jest-dom';

describe('Home', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders the code correctly', () => {
    const code = 'const greeting = "Hello world!"';
    const language = 'javascript';
    const show = true;
    const animated = false;

    const { getByText } = render(
      <Code code={code} language={language} show={show} animated={animated} />
    );

    expect(getByText(/const/i)).toBeInTheDocument();
  });
});
