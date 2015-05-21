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
        .directive("experience", ["ExperienceFactory", function (ExperienceFactory) {
            return {
                templateUrl: "app/partials/experience.html",
                link: function (scope) {
                    scope.experiences = ExperienceFactory.getExperience();
                }
            };
        }]
    );

    angular.module("app")
        .directive('slickSlider', ["$timeout", function ($timeout) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    $timeout(function () {
                        $(element).slick(scope.$eval(attrs.slickSlider));
                    });
                }
            };
        }]
    );

})(angular);