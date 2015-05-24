(function (angular) {
    "use strict";

    angular.module("app")
        .factory("SkillsFactory",
        function () {

            var skills = [
                {
                    name: "java",
                    category: "programming",
                    level: 8,
                    site: "http://en.wikipedia.org/wiki/Java_%28programming_language%29"
                },
                {
                    name: "javascript",
                    category: "programming",
                    level: 5,
                    site: "http://en.wikipedia.org/wiki/JavaScript"
                },
                {
                    name: "gradle",
                    category: "programming",
                    level: 4,
                    site: "http://en.wikipedia.org/wiki/Gradle"
                },
                {
                    name: "gwt",
                    category: "programming",
                    level: 6,
                    site: "http://en.wikipedia.org/wiki/Google_Web_Toolkit"
                },
                {
                    name: "html",
                    category: "design",
                    level: 7,
                    site: "http://en.wikipedia.org/wiki/HTML"
                },
                {
                    name: "css",
                    category: "design",
                    level: 7,
                    site: "http://en.wikipedia.org/wiki/Cascading_Style_Sheets"
                },
                {
                    name: "photoshop",
                    category: "design",
                    level: 8,
                    site: "http://en.wikipedia.org/wiki/Adobe_Photoshop"
                },
                {
                    name: "illustrator",
                    category: "design",
                    level: 5,
                    site: "http://en.wikipedia.org/wiki/Adobe_Illustrator"
                },
                {
                    name: "eclipse",
                    category: "tools",
                    level: 7,
                    site: "http://en.wikipedia.org/wiki/Eclipse_%28software%29"
                },
                {
                    name: "intellij",
                    category: "tools",
                    level: 6,
                    site: "http://en.wikipedia.org/wiki/IntelliJ_IDEA"
                },
                {
                    name: "git",
                    category: "tools",
                    level: 6,
                    site: "http://en.wikipedia.org/wiki/Git_%28software%29"
                }
            ];


            var legends = [
                {
                    name: "beginner",
                    level: 2,
                    description: "Secondary use, would require significant training to use commercially.",
                    colloquial: "Kind of know what I'm doing with it, this would be like how well I know php from using Wordpress casually."
                },
                {
                    name: "familiar",
                    level: 4,
                    description: "Used at least once professionally, some training required to use commercially.",
                    colloquial: "Something I would gladly learn more about given the chance like Gradle."
                },
                {
                    name: "proficient",
                    level: 6,
                    description: "Used multiple times professionally, minimal direction required to use commercially.",
                    colloquial: "Something that I'm pretty good with and generally able to solve problems given some time."
                },
                {
                    name: "instructor",
                    level: 8,
                    description: "Taught professionally, capable of assisting team leaders commercially.",
                    colloquial: "Some of these things I've used for years (Photoshop) and would love teaching them."
                },
                {
                    name: "expert",
                    level: 10,
                    description: "Capable of leading team commercially.",
                    colloquial: "I consider this someone who has at least 3-5 years experience and has succeeded delivering several products and at least failed to deliver once."
                },
                {
                    name: "master",
                    level: 12,
                    description: "Capable of authoring a book, significant contributions to field.",
                    colloquial: "This is like Douglas Crock level, someone who is a member of W3C and shaping the future of the web."
                }
            ];

            return {
                getSkills: function () {
                    return skills;
                },
                getLegends: function () {
                    return legends;
                }
            };
        }
    );

    angular.module("app")
        .factory("ExperienceFactory",
        function () {

            var experience = [
                {
                    organization: "Niksun",
                    website: "http://www.niksun.com",
                    skills_used: [
                        {
                            name: "Java",
                            usage: "60"
                        },
                        {
                            name: "js",
                            usage: "30"
                        },
                        {
                            name: "css",
                            usage: "10"
                        }
                    ],
                    position: "Web Developer",
                    start: new Date("2013-09"),
                    end: new Date("2015-03"),
                    purpose: "Company focused on providing network analysis software",
                    contributions: [
                        /*
                         * It was a web app that polled a file analysis service (virus scanner) telling the client when the analysis was completed
                         */
                        "Created a real time reporting web application for Niksun's file analysis service, used by several clients including Wells Fargo.",
                        /*
                         * Contributed the most LOC to the project, responsible for mocking and creating several prototypes.
                         */
                        "Rapidly designed and wireframed several prototypes in a effort to modernize Niksun's client facing applications.",
                        /*
                         * Created a build script using Gradle to automate workspace setup and running the project
                         */
                        "Created a workspace setup and build script using Gradle, significantly reducing onboarding time of new developers."
                    ],
                    samples: [
                        {
                            image: "Website-Template",
                            caption: "Proposal for new company homepage, designed using Photoshop."
                        },
                        {
                            image: "Template-with-Pods",
                            caption: "Prototype of new NetDetector, Niksun's network analysis software, implemented using GWT. This is a mock as the product is proprietary."
                        },
                        {
                            image: "Login-Template",
                            caption: "Redesigned login page for Niksun client facing applications."
                        }
                    ]
                },
                {
                    organization: "Scholars for Charity",
                    skills_used: [
                        {
                            name: "css",
                            usage: "50"
                        },
                        {
                            name: "Photoshop",
                            usage: "40"
                        },
                        {
                            name: "Illustrator",
                            usage: "10"
                        }
                    ],
                    position: "Webmaster",
                    start: new Date("2012-12"),
                    end: new Date("2013-05"),
                    purpose: "Nonprofit organization that designs websites for charity.",
                    contributions: [
                        "Gathered requirements, designed graphics, and created sites for clients.",
                        "Lead session for web and graphic design training new members in basic development techniques and best practices.",
                        "Actively promoted organization responsible for recruiting several members."
                    ],
                    samples: [
                        {
                            image: "quintessence",
                            caption: "Designed banner for client, Quintessence Music, a organization that helps promote local music groups."
                        },
                        {
                            image: "scholars-for-charity-banner",
                            caption: "Redesigned banner for organization's site"
                        }
                    ]
                }

            ];
            return {
                getExperience: function () {
                    return experience;
                }
            };
        }
    );
})(angular);
