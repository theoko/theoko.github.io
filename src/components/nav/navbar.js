'use strict';

const e = React.createElement;

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderLink(link) {
        return e(
            'li',
            {

            },
            e(
                'a',
                {
                    href: link.url
                },
                link.name
            )
        );
    }

    render() {

        return e(
            'nav',
            {
                
            },
            e(
                'div',
                {
                    className: ['nav-wrapper' + ' orange' + ' darken-2']
                    // classNames: 'nav-wrapper',
                    // className: 'orange',
                    // className: 'darken-2'
                },
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

                    this.props.links.forEach(function(link) {
                        e(
                            'li',
                            {
                
                            },
                            e(
                                'a',
                                {
                                    href: link.url
                                },
                                link.name
                            )
                        )
                    })
                    
                )
            )
        )

    }
}