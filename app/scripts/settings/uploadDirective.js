ONApp.directive('materialFileInput', ['notesService', function materialFileInput(notesService) {
    var directive = {
        restrict: 'E',
        template: '<input id="fileInput" type="file" class="ng-hide">' +
            ' <md-button id="uploadButton" class="md-raised md-primary" aria-label="attach_file">Choose file</md-button>' +
            ' <md-input-container md-no-float>' +
            ' <input id="textInput" ng-model="fileName" type="text" placeholder="No file chosen" ng-readonly="true"/>' +
            '</md-input-container>',

        link: function(scope, element, attrs) {
            var input = $(element[0].querySelector('#fileInput'));
            var button = $(element[0].querySelector('#uploadButton'));
            var textInput = $(element[0].querySelector('#textInput'));

            if (input.length && button.length && textInput.length) {
                button.click(function(e) {
                    input.click();
                });
                textInput.click(function(e) {
                    input.click();
                });
            }

            input.on('change', function(e) {
                var files = e.target.files;
                if (files[0]) {
                    scope.fileName = files[0].name;
                    notesService.loadNotes(files[0].path);
                } else {
                    scope.fileName = null;
                }
                scope.$apply();
            });
        }
    };
    return directive;
}]);