(function (angular) {
    "use strict";

    angular.module("app")
        .factory("SkillsFactory",
        [
            function () {
                var skills = [
                    {
                        name: "java",
                        category: "programming",
                        level: 8
                    },
                    {
                        name: "javascript",
                        category: "programming",
                        level: 5
                    },
                    {
                        name: "gradle",
                        category: "programming",
                        level: 4
                    },
                    {
                        name: "gwt",
                        category: "programming",
                        level: 6
                    },
                    {
                        name: "html",
                        category: "design",
                        level: 7
                    },
                    {
                        name: "css",
                        category: "design",
                        level: 7
                    },
                    {
                        name: "photoshop",
                        category: "design",
                        level: 8
                    },
                    {
                        name: "illustrator",
                        category: "design",
                        level: 5
                    },
                    {
                        name: "eclipse",
                        category: "tools",
                        level: 7
                    },
                    {
                        name: "intellij",
                        category: "tools",
                        level: 6
                    },
                    {
                        name: "git",
                        category: "tools",
                        level: 6
                    }
                ];

                return {
                    getSkills: function () {
                        return skills;
                    }
                };
            }
        ]
    )
    ;
})
(angular);
