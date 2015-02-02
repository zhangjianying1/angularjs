/**
 * 入口文件
 */

define(['angular', './controllers/index', './filters/index', 'directives/index'], function(angular){
    return angular.module('app', ['app-controller', 'app-filter', 'app-directive']);
});