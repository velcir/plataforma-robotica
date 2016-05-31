/// <reference path="../typings/index.d.ts" />

import * as angular from 'angular';

import 'angular-material';
import '@angular/router/angular1/angular_1_router';
import 'angular-material/angular-material.css';

const ngModule = angular.module('app', ['ngMaterial', 'ngComponentRouter']);

console.log(ngModule);
