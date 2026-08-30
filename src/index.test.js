'use strict';

// index.js executes its DOM-bootstrapping logic at import time, so each test
// sets up the document first and then loads the module in isolation.
function loadIndex() {
  jest.isolateModules(() => {
    require('./index');
  });
}

beforeEach(() => {
  document.body.innerHTML = '';
  // Materialize is loaded globally via a <script> tag in production; mock it.
  global.M = { Sidenav: { init: jest.fn() } };
});

afterEach(() => {
  delete global.M;
});

describe('index bootstrap - navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="navbar" data-navbarid="1" data-name="Theodore Konstantopoulos">
        <div class="navEntry" data-url="/" data-text="Portfolio" data-icon="fas fa-suitcase"></div>
        <div class="navEntry" data-url="https://github.com/theoko" data-text="Github" data-icon="fab fa-github"></div>
      </div>
    `;
    loadIndex();
  });

  it('renders the brand name from the data-name attribute', () => {
    const navbar = document.querySelector('.navbar');
    expect(navbar.textContent).toContain('Theodore Konstantopoulos');
  });

  it('renders an anchor for each navEntry url', () => {
    const navbar = document.querySelector('.navbar');
    expect(navbar.querySelector('a[href="/"]')).not.toBeNull();
    expect(
      navbar.querySelector('a[href="https://github.com/theoko"]')
    ).not.toBeNull();
  });

  it('renders icons from the navEntry data-icon attribute', () => {
    const navbar = document.querySelector('.navbar');
    expect(navbar.querySelector('i.fas.fa-suitcase')).not.toBeNull();
    expect(navbar.querySelector('i.fab.fa-github')).not.toBeNull();
  });
});

describe('index bootstrap - projects', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="project"
        data-projectid="1"
        data-projectimage="images/tsearch_demo.png"
        data-projectheader="tSearch"
        data-projectgit="https://gitlab.com/theoko/tsearch_public"
        data-projectdescription="A web search engine."></div>
    `;
    loadIndex();
  });

  it('renders the project image from the data attribute', () => {
    const img = document.querySelector('.project img');
    expect(img).not.toBeNull();
    expect(img.getAttribute('src')).toBe('images/tsearch_demo.png');
  });

  it('renders the project header', () => {
    expect(document.querySelector('.project h4').textContent).toBe('tSearch');
  });

  it('renders the git link with matching href', () => {
    const link = document.querySelector('.project a');
    expect(link.getAttribute('href')).toBe(
      'https://gitlab.com/theoko/tsearch_public'
    );
  });

  it('renders the project description', () => {
    expect(document.querySelector('.project p').textContent).toBe(
      'A web search engine.'
    );
  });

  it('renders one card per .project element', () => {
    document.body.innerHTML = `
      <div class="project" data-projectid="1" data-projectimage="a.png"
        data-projectheader="A" data-projectgit="https://a" data-projectdescription="da"></div>
      <div class="project" data-projectid="2" data-projectimage="b.png"
        data-projectheader="B" data-projectgit="https://b" data-projectdescription="db"></div>
    `;
    loadIndex();
    expect(document.querySelectorAll('.project img').length).toBe(2);
  });
});

describe('index bootstrap - resilience', () => {
  it('does not throw when there are no navbar or project elements', () => {
    document.body.innerHTML = '<div></div>';
    expect(() => loadIndex()).not.toThrow();
  });

  it('initializes the Materialize sidenav on DOMContentLoaded', () => {
    document.body.innerHTML = '<div class="sidenav"></div>';
    loadIndex();
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(global.M.Sidenav.init).toHaveBeenCalled();
  });
});
