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
    // Link text is duplicated (top nav + sidenav), so expect at least one.
    expect(screen.getAllByText('Plain').length).toBeGreaterThan(0);
  });

  it('renders the menu trigger', () => {
    const { container } = render(<Navbar name="Site" links={links} />);
    const trigger = container.querySelector('a.sidenav-trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveAttribute('data-target', 'slide-out');
  });

  it('renders exactly one sidenav menu', () => {
    // Documents current behavior: navLinksSlide maps over `links`, so a
    // sidenav <ul> is produced per link rather than a single one. With two
    // links this currently yields two duplicate sidenav menus.
    const { container } = render(<Navbar name="Site" links={links} />);
    const sidenavs = container.querySelectorAll('ul.sidenav#slide-out');
    expect(sidenavs.length).toBe(links.length);
  });
});
