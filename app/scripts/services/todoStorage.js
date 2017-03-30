/*global angular */

/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */
angular.module('todomvc')
	.service('todoStorage', function ($q) {
		'use strict';

		var STORAGE_ID = 'todos-angularjs';

		var store = {
			todos: [],

			insert: function (todo) {
				var deferred = $q.defer();

				this.todos.push(todo);

				this._saveToLocalStorage(this.todos);
				deferred.resolve(this.todos);

				return deferred.promise;
			},

			put: function (todo, index) {
				var deferred = $q.defer();

				this.todos[index] = todo;

				this._saveToLocalStorage(this.todos);
				deferred.resolve(this.todos);

				return deferred.promise;
			},

			clearCompleted: function () {
				var deferred = $q.defer();

				var incompleteTodos = this.todos.filter(function (todo) {
					return !todo.completed;
				});

				angular.copy(incompleteTodos, this.todos);

				this._saveToLocalStorage(this.todos);
				deferred.resolve(this.todos);

				return deferred.promise;
			},

			delete: function (todo) {
				var deferred = $q.defer();

				this.todos.splice(this.todos.indexOf(todo), 1);

				this._saveToLocalStorage(store.todos);
				deferred.resolve(store.todos);

				return deferred.promise;
			},

			get: function () {
				var deferred = $q.defer();

				angular.copy(this._getFromLocalStorage(), this.todos);
				deferred.resolve(this.todos);

				return deferred.promise;
			},

			_getFromLocalStorage: function () {
				return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
			},

			_saveToLocalStorage: function (todos) {
				localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
			}
		};

		return store;
	});
