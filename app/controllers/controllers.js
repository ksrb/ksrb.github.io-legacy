(function () {
    "use strict";

    angular.module("app")
        .controller("NavbarController",
        ["$location", "$anchorScroll",
            function ($location, $anchorScroll) {
                this.scrollTo = function (id) {
                    var old = $location.hash();
                    $location.hash(id);
                    $anchorScroll();
                    $location.hash(old);
                };
            }
        ]
    );

    angular.module("app")
        .controller("SkillsController",
        ["SkillsFactory",
            function (SkillsFactory) {
                this.skills = SkillsFactory.getSkills();

                this.showMeter = function (skillLevel, meterNum) {
                    return skillLevel >= meterNum;
                };

                this.getIcon = function (skill) {
                    return iconPathPrefix + skill.name + iconPathSuffix;
                };

                var iconPathPrefix = "images/skills/";
                var iconPathSuffix = ".svg";
                this.getGradientStop = function (category) {
                    return SkillsFactory.getGradientStops()[category];
                };


            }
        ]
    );

    angular.module("app")
        .controller("ExperienceController",
        ["ExperienceFactory",
            function (ExperienceFactory) {
                this.experiences = ExperienceFactory.getExperience();

                this.getLogoImage = function (experience) {
                    return this.getExperienceFolderPath(experience) + "logo.png";
                };

                this.getSampleThumbNail = function (experience, sample) {
                    return this.getExperienceFolderPath(experience) + sample + "-thumbnail.png";
                };

                this.getExperienceFolderPath = function (experience) {
                    return "images/experience/" + experience.organization.toLowerCase() + "/";
                };

            }
        ]
    );
})();

