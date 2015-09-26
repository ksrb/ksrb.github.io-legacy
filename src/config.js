System.config({
  baseURL: "./",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.2",
    "angular-animate": "github:angular/bower-angular-animate@1.4.1",
    "angular-foundation": "github:pineconellc/angular-foundation-bower@0.6.0",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.2",
    "babel": "npm:babel-core@5.6.15",
    "babel-runtime": "npm:babel-runtime@5.6.15",
    "core-js": "npm:core-js@0.9.18",
    "css": "github:systemjs/plugin-css@0.1.13",
    "jquery": "github:components/jquery@2.1.4",
    "kenwheeler/slick": "github:kenwheeler/slick@1.5.5",
    "pineconellc/angular-foundation-bower": "github:pineconellc/angular-foundation-bower@0.6.0",
    "github:angular/bower-angular-animate@1.4.1": {
      "angular": "github:angular/bower-angular@1.4.2"
    },
    "github:angular/bower-angular-mocks@1.4.2": {
      "angular": "github:angular/bower-angular@1.4.2"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:babel-runtime@5.6.15": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.18": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
