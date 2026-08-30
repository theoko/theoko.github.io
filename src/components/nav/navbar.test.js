'use strict';

import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './navbar';

const links = [
  { url: '/', name: 'Portfolio', icon: 'fas fa-suitcase' },
  { url: 'https://github.com/theoko', name: 'Github', icon: 'fab fa-github' }
];

describe('Navbar', () => {
  it('renders the brand name from props', () => {
    render(<Navbar name="Theodore Konstantopoulos" links={[]} />);
    expect(screen.getByText('Theodore Konstantopoulos')).toBeInTheDocument();
  });

  it('renders an anchor for each link with the correct href', () => {
    const { container } = render(<Navbar name="Site" links={links} />);
    links.forEach(link => {
      const anchor = container.querySelector(`a[href="${link.url}"]`);
      expect(anchor).toBeInTheDocument();
    });
  });

  it('renders an icon element when a link has an icon', () => {
    const { container } = render(
      <Navbar name="Site" links={[links[0]]} />
    );
    const icon = container.querySelector('i.fas.fa-suitcase');
    expect(icon).toBeInTheDocument();
  });

  it('omits the icon element when a link has no icon', () => {
    const { container } = render(
      <Navbar name="Site" links={[{ url: '/', name: 'Plain', icon: null }]} />
    );
    // The menu trigger always has its own <i>, so scope to the link anchors.
    expect(container.querySelector('li a i')).toBeNull();
    // Link text appears once in the top nav and once in the sidenav.
    expect(screen.getAllByText('Plain')).toHaveLength(2);
  });

  it('renders the menu trigger', () => {
    const { container } = render(<Navbar name="Site" links={links} />);
    const trigger = container.querySelector('a.sidenav-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-target', 'slide-out');
  });

  it('renders exactly one sidenav menu containing every link', () => {
    const { container } = render(<Navbar name="Site" links={links} />);
    const sidenavs = container.querySelectorAll('ul.sidenav#slide-out');
    expect(sidenavs).toHaveLength(1);
    expect(sidenavs[0].querySelectorAll('li')).toHaveLength(links.length);
  });
});
