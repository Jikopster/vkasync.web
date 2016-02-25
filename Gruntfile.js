module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      bootstrap: 'public/assets/css/bootstrap.*'
    },
    copy: {
      bootstrap: {
        expand: true,
        cwd: 'bootstrap-3.3.6/dist/',
        src: 'css/bootstrap.min.css',
        dest: 'public/assets/'
      }
    }
  })
  
  grunt.registerTask('bootstrap', ['clean:bootstrap', 'copy:bootstrap'])
  
  grunt.registerTask('default', ['bootstrap'])
  
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-contrib-copy')
}