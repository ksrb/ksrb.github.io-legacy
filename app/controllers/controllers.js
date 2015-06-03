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
                this.legends = SkillsFactory.getLegends();

                this.setSelectedLegend = function (legend) {
                    //Double click 'deselect' legend
                    if (this.selectedLegend === legend) {
                        this.selectedLegend = null;
                    } else {
                        this.selectedLegend = legend;
                    }
                };

                this.skillIsGreaterThanSelectedSkill = function (skill) {
                    //if skill hasn't been selected show all
                    if (!this.selectedLegend) {
                        return true;
                    }
                    return skill.level >= this.selectedLegend.level - 1;
                }.bind(this);

                this.showMeter = function (skillLevel, meterNum) {
                    return skillLevel >= meterNum;
                };

                //Presentational data and functions
                var iconPathPrefix = "images/skills/";
                var iconPathSuffix = ".svg";

                this.getIcon = function (skill) {
                    return iconPathPrefix + skill.obj.name + iconPathSuffix;
                };

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

                this.getGradientStop = function (skill) {
                    return gradientStops[skill.obj.category];
                };

            }
        ]
    );

    angular.module("app")
        .controller("ExperienceController",
        ["ExperienceFactory", "$modal", "$scope",
            /**
             * Controller is used in ng-repeat, ng-repeat will attach its key to the controllers $scope
             * For example:
             * <div ng-repeat="experience in experiences" ng-controller="MyCtrl"></div>
             *
             * In the controller:
             * $scope.experience //will access the data repeated via ng-repeat
             */
                function ctrl(ExperienceFactory, $modal, $scope) {

                $scope.getLogoImage = function () {
                    return getExperienceFolderPath() + "logo.png";
                };

                $scope.getSampleThumbNail = function (sample) {
                    return getExperienceFolderPath() + sample.image + "-thumbnail.png";
                };

                $scope.getSample = function (sample) {
                    return getExperienceFolderPath() + sample.image + ".png";
                };

                $scope.getSkillName = function (skill, useShort) {
                    //If referencing a skill object access the name
                    if (skill.obj) {
                        if (useShort && skill.obj.short_name) {
                            return skill.obj.short_name;
                        }
                        return skill.obj.name;
                    }
                    //If not referencing a skill obj try name obj
                    return skill.name;
                }

                function getExperienceFolderPath() {
                    return "images/experience/" + $scope.experience.organization.toLowerCase() + "/";
                }


                $scope.openModal = function (slideNum) {
                    $scope.slideNum = slideNum;
                    $modal.open({
                        //TODO consider a alternative to passing the scope to access common functions
                        //Passing scope over to access image utility functions
                        scope: $scope,
                        templateUrl: "app/partials/experience-modal.html"
                    });
                };

            }
        ]
    );


})();