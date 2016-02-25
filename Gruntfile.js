module.exports = function (grunt) {
  grunt.initConfig({
    pixar: {
      logo: {
        src: 'logo/logo.json',
        dest: 'logo/logo.jade'
      }
    },
    less: {
      logo: {
          options: {
            strictUnits: true
          },
          src: 'logo/logo.less',
          dest: 'logo/logo.css'
      }
    },
    cssmin: {
      logo: {
        src: 'logo/logo.css',
        dest: 'logo/logo.min.css'
      }
    },
    copy: {
      logo: {
        nonull: true,
        files: [
          {
            src: 'logo/logo.min.css',
            dest: 'public/assets/css/logo.min.css'
          },
          {
            src: 'logo/logo.jade',
            dest: 'views/logo.jade'
          }
        ]
      },
      bootstrap: {
        expand: true,
        cwd: 'bootstrap-3.3.6/dist/',
        src: '**',
        dest: 'public/assets/'
      }
    }
  })
  
  grunt.registerTask('logo', ['pixar:logo', 'less:logo', 'cssmin:logo', 'copy:logo'])
  
  grunt.registerTask('bootstrap', ['copy:bootstrap'])
  
  grunt.registerTask('default', ['logo', 'bootstrap'])
  
  grunt.loadNpmTasks('grunt-pixar')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-copy')
}