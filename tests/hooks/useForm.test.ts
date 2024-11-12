import { renderHook, act } from '@testing-library/react';
import { useForm } from '../../src/hooks/useForm';

type FormData = {
  title: string;
};

const config = {
  title: { required: true, pattern: /^[a-zA-Z0-9 ]+$/ },
};

describe('useForm', () => {

  it('should initialize values and errors as empty', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
  });

  it('should update values on handleChange', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    act(() => {
      result.current.handleChange('title', 'Movie title');
    });

    expect(result.current.values.title).toBe('Movie title');
  });

  it('should validate required field', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    act(() => {
      result.current.handleChange('title', '');
      result.current.validateForm();
    });

    expect(result.current.errors.title).toBe('Field is required.');
  });

  it('should return true if form is valid', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    act(() => {
      result.current.handleChange('title', 'Movie title');
    });

    const isValid = result.current.validateForm();
    expect(isValid).toBe(true);
    expect(result.current.errors).toEqual({});
  });

  it('should return false if form is invalid', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    act(() => {
      result.current.handleChange('title', '');
    });

    const isValid = result.current.validateForm();
    expect(isValid).toBe(false);
  });

  it('should reset form values and errors on cleanForm', () => {
    const { result } = renderHook(() => useForm<FormData>(config));
    
    act(() => {
      result.current.handleChange('title', 'Movie title');
      result.current.cleanForm();
    });

    expect(result.current.values).toEqual({});
    expect(result.current.errors).toEqual({});
  });
});
