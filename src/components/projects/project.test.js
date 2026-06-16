'use strict';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Project from './project';

const baseProps = {
  projectID: 1,
  projectImage: 'images/tsearch_demo.png',
  projectHeader: 'tSearch',
  projectGit: 'https://gitlab.com/theoko/tsearch_public',
  projectDescription: 'A web search engine written in Java and PHP.'
};

describe('Project', () => {
  it('renders the project image from props', () => {
    const { container } = render(<Project {...baseProps} />);
    const img = container.querySelector('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', baseProps.projectImage);
    expect(img).toHaveClass('responsive-img');
  });

  it('renders the project header', () => {
    render(<Project {...baseProps} />);
    expect(
      screen.getByRole('heading', { name: baseProps.projectHeader })
    ).toBeInTheDocument();
  });

  it('renders the git link with matching href and text', () => {
    render(<Project {...baseProps} />);
    const link = screen.getByRole('link', { name: baseProps.projectGit });
    expect(link).toHaveAttribute('href', baseProps.projectGit);
  });

  it('renders the project description', () => {
    render(<Project {...baseProps} />);
    expect(screen.getByText(baseProps.projectDescription)).toBeInTheDocument();
  });

  it('initializes selectedID state to null', () => {
    const ref = React.createRef();
    render(<Project ref={ref} {...baseProps} />);
    expect(ref.current.state.selectedID).toBeNull();
  });

  it('updates state on click', () => {
    const ref = React.createRef();
    const { container } = render(<Project ref={ref} {...baseProps} />);
    fireEvent.click(container.querySelector('.row'));
    // The click handler sets `selected` (note: distinct from the
    // `selectedID` initialized in the constructor).
    expect(ref.current.state.selected).toBe(true);
  });
});
