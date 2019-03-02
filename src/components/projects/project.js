'use strict';

import React from "react";

const e = React.createElement;

export default class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedID: null };
    }

    render() {

        return e(
            'div',
            { 
                className: 'row',
                onClick: () => this.setState({ selected: true }) 
            },

            e(
                'div',
                {
                    className: 'col s4'
                },
                e(
                    'img',
                    {
                        src: this.props.projectImage,
                        className: 'responsive-img'
                    }
                )
            ),

            e(
                'div',
                {
                    className: 'col s8'
                },
                e(
                    'h4',
                    {

                    },
                    this.props.projectHeader
                ),
                e(
                    'a',
                    {
                        href: this.props.projectGit
                    },
                    this.props.projectGit
                ),
                e(
                    'p',
                    {

                    },
                    this.props.projectDescription
                )
            )
        );

    }
}