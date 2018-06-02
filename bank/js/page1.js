app.controller("Page1", [ "$http", "globals",
  function($http, globals) {
    var ctrl = this;
    ctrl.balance = 0;
    ctrl.limit = 0;
    ctrl.recipient = '';
    ctrl.title = '';
    ctrl.amount = 0;
    ctrl.prevrecs = [];
    ctrl.prevrec = '';

    $http.get("/account").then(function(rep) {
      ctrl.balance = rep.data.balance;
      ctrl.limit = rep.data.limit;
    });
    ctrl.getPrevrec = function() {
      $http.get('/prevrec/').then(
        function(rep){
          ctrl.prevrecs = rep.data;
        },
        function(err) {
          alert(err);
        }
      );
    }
    ctrl.setRecipient = function() {
      ctrl.recipient = ctrl.prevrec;
    }
    ctrl.resetPrevrec = function() {
      ctrl.prevrec = '';
    }
    ctrl.transfer = function() {
      $http.post('/account', {recipient: ctrl.recipient, amount: ctrl.amount, title: ctrl.title}).then(function (rep) {
          ctrl.balance = rep.data.balance;
          ctrl.recipient = '';
          ctrl.title = '';
          ctrl.amount = 0;
          globals.alert.type = 'success';
          globals.alert.message = 'Transfered successfully';
        },
        function (err) {
          globals.alert.type = 'danger';
          globals.alert.message = 'Transfer failed: ' + err.data.err;
        }
      );
    }

    ctrl.getPrevrec();

  }
]);