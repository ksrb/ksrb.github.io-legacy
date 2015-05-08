(function (angular) {
    "use strict";

    angular.module("app")
        .factory("SkillsFactory",
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

            var gradientStops = {
                programming: [
                    ["#354B88", "#29538B"],
                    ["#28548B", "#28548B"],
                    ["#1C6193", "#4170A0"],
                    ["#1C6193", "#4170A0"],
                    ["#4471A1", "#6283AD"]
                ],
                design: [
                    ["#467463", "#406A5A"],
                    ["#3F6859", "#3E6556"],
                    ["#3F6859", "#4C7C6A"],
                    ["#4F816E", "#62A088"],
                    ["#67A38C", "#8DBAA9"]
                ],
                tools: [
                    ["#744646", "#744646"],
                    ["#694040", "#663F3F"],
                    ["#663F3F", "#7C4C4B"],
                    ["#8E6261", "#9F6061"],
                    ["#A36666", "#BB8E8E"]
                ]
            };

            return {
                getSkills: function () {
                    return skills;
                },
                getGradientStops: function () {
                    return gradientStops;
                }
            };
        }
    );

    angular.module("app")
        .factory("ExperienceFactory",
        function () {
            return {};
        }
    );
})(angular);
