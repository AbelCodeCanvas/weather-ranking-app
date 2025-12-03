import { render, screen, fireEvent } from '@testing-library/react';
import { SearchForm } from '../../src/components/SearchForm';

describe('SearchForm', () => {
  it('renders the search input and button', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText(/enter city name/i)).toBeInTheDocument();
    expect(screen.getByText(/get rankings/i)).toBeInTheDocument();
  });

  it('calls onSearch with the input value when form is submitted', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(screen.getByText(/get rankings/i));
    
    expect(mockOnSearch).toHaveBeenCalledWith('London');
  });

  it('prevents form submission with empty input', () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);
    
    fireEvent.click(screen.getByText(/get rankings/i));
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
