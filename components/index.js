'use strict';

const e = React.createElement;

class Project extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selected: false };
    }

    // renderProject = () => {

    // }

    render() {

        // if (this.state.selected) {
        //     return 'Selected project ' + this.props.projectID;
        // }

        // var test = (
        //     <div class="row"> 
        //         <div class="col s4"><img src={this.props.projectImage} /></div>
        //         <div class="col s8">2</div>
        //     </div>
        // ) 

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
                    'p',
                    {

                    },
                    this.props.projectDescription
                )
            )
        );

    }
}

document.querySelectorAll('.project')
    .forEach(domContainer => {

        // Read the project ID from a data-* attribute.
        const projectID = parseInt(domContainer.dataset.projectid, 10);
        const projectImage = domContainer.dataset.projectimage;

        const projectHeader = domContainer.dataset.projectheader;
        const projectDescription = domContainer.dataset.projectdescription;

        ReactDOM.render(
            e(Project, {
                projectID: projectID,
                projectImage: projectImage,
                projectHeader: projectHeader,
                projectDescription: projectDescription
            }),

            domContainer
        );

    });