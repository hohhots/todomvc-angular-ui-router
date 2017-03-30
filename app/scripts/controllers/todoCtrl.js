angular.module('todomvc')
  .controller('TodoCtrl', ['$scope','$filter', 'todoStorage', function($scope,$filter,store) {
    var self = this;

    this.todos = store.todos;
    this.newTodo = '';
    this.editedTodo = null;

    this.saving = false;

    $scope.$watch('todo.todos', function () {
			self.remainingCount = $filter('filter')(self.todos, { completed: false }).length;
			self.completedCount = self.todos.length - self.remainingCount;
			self.allChecked = !self.remainingCount;
    }, true);

    /**$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
      console.log();
			var status = $scope.status; // = toState.url || '';
			self.statusFilter = (status === 'active') ?
				{ completed: false } : (status === 'completed') ?
				{ completed: true } : {};
		});
**/
    this.addTodo = function() {
      if(!self.newTodo){
        return;
      }

      var todo = {
        title: self.newTodo.trim(),
        completed: false
      };

      self.saving = true;
      store.insert(todo)
        .then(function() {
          self.newTodo = '';
        })
        .finally(function() {
          self.saving = false;
        });
    };

    this.editTodo = function (todo) {
      self.editedTodo = todo;
      // Clone the original todo to restore it on demand.
      self.originalTodo = angular.extend({}, todo);
    };

    this.clearCompletedTodos = function () {
      store.clearCompleted();
    };

    this.markAll = function (completed) {
      self.todos.forEach(function (todo) {
        if (todo.completed !== completed) {
          self.toggleCompleted(todo, completed);
        }
      });
    };

    this.saveEdits = function (todo, event) {
      // Blur events are automatically triggered after the form submit event.
      // This does some unfortunate logic handling to prevent saving twice.
      if (event === 'blur' && self.saveEvent === 'submit') {
        self.saveEvent = null;
        return;
      }

      self.saveEvent = event;

      if (self.reverted) {
        // Todo edits were reverted-- don't save.
        self.reverted = null;
        return;
      }

      todo.title = todo.title.trim();

      if (todo.title === self.originalTodo.title) {
        self.editedTodo = null;
        return;
      }

      store[todo.title ? 'put' : 'delete'](todo)
        .then(function success() {}, function error() {
          todo.title = self.originalTodo.title;
        })
        .finally(function () {
          self.editedTodo = null;
        });
    };

    this.revertEdits = function (todo) {
      self.todos[self.todos.indexOf(todo)] = self.originalTodo;
      self.editedTodo = null;
      self.originalTodo = null;
      self.reverted = true;
    };

    this.removeTodo = function (todo) {
			store.delete(todo);
		};

    this.toggleCompleted = function (todo, completed) {
			if (angular.isDefined(completed)) {
				todo.completed = completed;
			}
			store.put(todo, self.todos.indexOf(todo))
				.then(function success() {}, function error() {
					todo.completed = !todo.completed;
				});
		};

  }]);
