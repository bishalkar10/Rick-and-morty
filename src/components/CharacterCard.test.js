import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CharacterCard from './CharacterCard';
import {describe, test, expect} from '@jest/globals';
import '@testing-library/jest-dom';
import React from 'react';

describe('CharacterCard', () => {
  const character = {
    id: 1,
    name: 'John Doe',
    image: 'example.jpg',
  };

  test('renders character name', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...character} />
      </BrowserRouter>
    );
    const characterName = screen.getByText(/John Doe/i);
    expect(characterName).toBeInTheDocument();
  });

  test('renders character image', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...character} />
      </BrowserRouter>
    );
    const characterImage = screen.getByAltText(/John Doe/i);
    expect(characterImage).toBeInTheDocument();
    expect(characterImage).toHaveAttribute('src', 'example.jpg');
  });

  test('navigates to character details page on click', () => {
    render(
      <BrowserRouter>
        <CharacterCard {...character} />
      </BrowserRouter>
    );
    const characterLink = screen.getByRole('link');
    expect(characterLink).toHaveAttribute('href', '/character/1');
  });
});