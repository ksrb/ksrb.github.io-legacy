(function (angular) {
    "use strict";

    angular.module("app")
        .directive("skills", function () {
            return {
                templateUrl: "app/partials/skills.html",
                controller: "SkillsController",
                controllerAs: "SkillsCtrl"
            };
        }
    );

    angular.module("app")
        .directive("experience", function () {
            return {
                templateUrl: "app/partials/experience.html",
                controller: "ExperienceController",
                controllerAs: "ExperienceCtrl"
            };
        }
    );

})(angular);