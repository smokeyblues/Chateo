'use strict';

angular.module('users.user').controller('UserDirectoryController', ['$scope', '$filter', 'User', 'Socket',
  function ($scope, $filter, User, Socket) {
    User.query(function (data) {
      $scope.users = data;
      console.log($scope.users);
      $scope.userNames = $scope.users.map(function(element) {
        return element.firstName + ' ' + element.lastName
      });

      $scope.inviteReceived = false;

      $scope.sendInvite = function (to, from) {
        console.log(from.displayName, 'to', to.displayName);
        var roomName = 'room' + to._id;
        var inviteUrl = 'https://meet.jit.si/' + from.firstName + from.lastName + 'meets' + to.firstName + to.lastName
        console.log(to);
        var inviteData = {
          sender: from,
          receiver: to,
          link: inviteUrl
        }
        Socket.emit('vcInviteReceived', inviteData);
        console.log('RoomName: ' + roomName);

      }

      Socket.on('beacon', function(){
        console.log('socket.io is working');
      })

      Socket.on('triggerInvite', function(inviteData){
        console.log(inviteData);
        $scope.inviteReceived = true;
        $scope.invitation = inviteData;
        console.log($scope.invitation);
      });

      $scope.inviteDenied = function() {
        $scope.inviteReceived = false;
      };

      $scope.grammar = '#JSGF V1.0; grammar userNames; public <userName> = ' + $scope.userNames.join(' | ') + ' ;'
      $scope.buildPager();
      $scope.micIsOn = false;
      // console.log($scope.userNames);
    });

    $scope.buildPager = function () {
      $scope.pagedSearchItems = [];
      $scope.itemsPerPage = 8;
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

    $scope.placeholder ="Who would you like to chat with?";

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
      $scope.recognition.start();
      console.log('Ready to receive voice command');
      $scope.placeholder ="Please say the name of the person you would like to chat with";
      $scope.micIsOn = true;
    };

    $scope.recognition.onresult = function(event) {
      var last = event.results.length - 1;
      $scope.micIsOn = true;
      $scope.name = event.results[last][0].transcript;
      $scope.vocalResponse = event.results;
      console.log($scope.name);
      $scope.$apply(function() {
        $scope.search = $scope.name;
        $scope.figureOutItemsToDisplay();
      });
      $scope.recognition.stop();
    };
  }
]);
