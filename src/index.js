'use strict';

import React from "react";
import ReactDOM from "react-dom";

import Navbar from "./components/nav/navbar";
import Project from "./components/projects/project";

const e = React.createElement;

// Build navigation
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});

document.querySelectorAll('.navbar')
    .forEach(domContainer => {

        // Read the project ID from a data-* attribute.
        const navbarID = parseInt(domContainer.dataset.navbarid, 10);
        const name = domContainer.dataset.name;

        const links = [];

        document.querySelectorAll('.navEntry')
            .forEach(domContainer => {
                
                const url = domContainer.dataset.url;
                const name = domContainer.dataset.text;
                const icon = domContainer.dataset.icon;

                links.push({
                    url: url,
                    name: name,
                    icon: icon
                })
        });

        ReactDOM.render(
            e(Navbar, {
                navbarID: navbarID,
                name: name,
                links: links
            }),

            domContainer
        );

});

// Build projects
document.querySelectorAll('.project')
    .forEach(domContainer => {

        // Read the project ID from a data-* attribute.
        const projectID = parseInt(domContainer.dataset.projectid, 10);
        const projectImage = domContainer.dataset.projectimage;

        const projectHeader = domContainer.dataset.projectheader;
        const projectGit = domContainer.dataset.projectgit;
        const projectDescription = domContainer.dataset.projectdescription;

        ReactDOM.render(
            e(Project, {
                projectID: projectID,
                projectImage: projectImage,
                projectHeader: projectHeader,
                projectGit: projectGit,
                projectDescription: projectDescription
            }),

            domContainer
        );

});