"use strict";

import "angular-mocks";

describe("Skills Controller", function () {
    var skillsController;
    beforeEach(module("app"));

    beforeEach(
        inject(function ($controller) {
            skillsController = $controller("SkillsController");
        })
    )

    it("should get the skills factory injected into it", function () {
        expect(skillsController).toBeDefined();
    });
});