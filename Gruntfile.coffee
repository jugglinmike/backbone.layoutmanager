# Grunt configuration updated to latest Grunt.  That means your minimum
# version necessary to run these tasks is Grunt 0.4.
#
# Please install this locally and install `grunt-cli` globally to run.
module.exports = ->

  # Initialize the configuration.
  @initConfig

    # Lint source, node, and test code with some sane options.
    jshint:
      files: ["backbone.layoutmanager.js", "node/index.js"]

      # Allow certain options.
      options:
        browser: true
        boss: true
        immed: false
        eqnull: true
        globals: {}

    # Run QUnit tests for browser environments.
    qunit:
      files: ["test/index.html"]

    mocha:
      files: ["test/mocha.html"]

      options:
        run: true

    simplemocha:
      files: [
        # This is unfortunate, but we have to load the source files as though
        # they were test files in order to properly support tests in Node.js
        # and the browser.
        ".", "test/vendor/util.js",
        "test/*.js", "!test/dom.js"]
      options:
        ui: "qunit"

    # Run QUnit tests for Node.js environments.
    nodequnit:
      files: ["test/*.js", "!test/dom.js"]

      options:
        deps: ["test/vendor/util.js"]
        code: "."
        testsDir: "test/"

  # Load external Grunt task plugins.
  @loadNpmTasks "grunt-contrib-jshint"
  @loadNpmTasks "grunt-contrib-qunit"
  @loadNpmTasks "grunt-mocha"
  @loadNpmTasks "grunt-simple-mocha"
  @loadNpmTasks "grunt-nodequnit"

  # Default task.
  @registerTask "default", ["jshint", "qunit", "nodequnit"]
