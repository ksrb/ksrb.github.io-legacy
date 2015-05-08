(function () {
    "use strict";

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
})();

