'use strict';

import React from "react";

const e = React.createElement;

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {

        const navLinks = this.props.links.map(function (link) {
            return e(
                'li',
                {

                },
                e(
                    'a',
                    {
                        href: link.url
                    },

                    link.icon != null ? e(
                        'i',
                        {
                            className: link.icon
                        }
                    ) : null,

                    link.icon != null ? ' ' + link.name : link.name
                )
            )
        })

        // <ul id="slide-out" class="sidenav">
        //   <li><a href="#!">First Sidebar Link</a></li>
        //   <li><a href="#!">Second Sidebar Link</a></li>
        // </ul>

        const navLinksSlide = this.props.links.map(function (link) {
            return e(
                'ul',
                {
                    className: 'sidenav',
                    id: 'slide-out'
                },
                navLinks
            )
        });

        return e(
            'nav',
            {

            },
            e(
                'div',
                {
                    className: ['nav-wrapper' + ' orange' + ' lighten-1']
                },

                // <a href="#" data-target="slide-out" class="sidenav-trigger show-on-large"><i class="material-icons">menu</i></a>

                e(
                    'a',
                    {
                        className: 'sidenav-trigger show-on-large',
                        href: '#',
                        'data-target': 'slide-out'
                    },
                    e(
                        'i',
                        {
                            className: 'material-icons'
                        },
                        'menu'
                    )
                ),
                e(
                    'a',
                    {
                        className: 'brand-logo'
                    },
                    this.props.name
                ),
                e(
                    'ul',
                    {
                        className: ['right' + ' hide-on-med-and-down']
                    },
                    navLinks
                ),
                navLinksSlide
            )
        )

    }
}