require.config({
    baseUrl: '../../js',
    paths: {
        angular: 'libs/angular',
        app: 'app'
    },
    shim: {
        angular: {
            exports: 'angular'
        }
    },
    urlArgs: "v=" +  (new Date()).getTime()
});
define(['angular', 'app'], function(angular){
    angular.bootstrap(document, ['app']);
});