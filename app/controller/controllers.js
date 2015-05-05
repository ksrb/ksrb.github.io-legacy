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

            }
        ]
    );
})();

