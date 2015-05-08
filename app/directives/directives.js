(function (angular) {
    "use strict";

    angular.module("app")
        .directive("skills", function () {
            return {
                templateUrl: "app/partials/skills.html",
                restrict: "E",
                controller: "SkillsController",
                controllerAs: "SkillsCtrl"
            };
        }
    );

    angular.module("app")
        .directive("experience", function () {
            return {
                templateUrl: "app/partials/experience.html",
                restrict: "E",
                controller: "ExperienceController",
                controllerAs: "ExperienceCtrl"
            };
        }
    );

})(angular);