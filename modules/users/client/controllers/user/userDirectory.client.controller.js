'use strict';

angular.module('users.user').controller('UserDirectoryController', ['$scope', '$filter', 'User',
  function ($scope, $filter, User) {
    User.query(function (data) {
      $scope.users = data;
      $scope.userNames = $scope.users.map(function(element) {
        return element.firstName + ' ' + element.lastName
      });
      $scope.grammar = '#JSGF V1.0; grammar userNames; public <userName> = ' + $scope.userNames.join(' | ') + ' ;'
      $scope.buildPager();
      console.log($scope.userNames);
    });

    console.log("the controller is here.");

    $scope.buildPager = function () {
      $scope.pagedSearchItems = [];
      $scope.itemsPerPage = 15;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.users, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedSearchItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

    $scope.SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    $scope.SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    $scope.SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
    $scope.recognition = new SpeechRecognition();
    $scope.speechRecognitionList = new SpeechGrammarList();
    $scope.speechRecognitionList.addFromString($scope.grammar, 1);
    $scope.recognition.grammars = $scope.speechRecognitionList;
    $scope.recognition.lang = 'un-US';
    $scope.recognition.interimResults = false;
    $scope.recognition.maxAlternatives = 1;

    $scope.webSpeech = function () {
      // console.log($scope.grammar);
      $scope.recognition.start();
      console.log('Ready to receive voice command');
    };

    $scope.recognition.onresult = function(event) {
      var last = event.results.length - 1;
      var name = event.results[last][0].transcript;
      $scope.vocalResponse = event.results;
      console.log(name);
    }
  }
]);
