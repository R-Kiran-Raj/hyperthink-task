import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import { Sidebar } from './Sidebar';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Sidebar', () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { id: 2, name: 'Test User', username: 'testuser', email: 'test@example.com' },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders fetched user name in the sidebar', async () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
});
