import {Firebase} from '../../../common/services/firebase.service';

export const sidenav: angular.IComponentOptions = {
  template: require('./sidenav.component.html'),
  controller: SidenavController
};

SidenavController.$inject = ['Firebase', '$timeout'];

function SidenavController(firebase: Firebase, $timeout) {
  firebase.storageUrl('/camera.ogv').then(url => {
    $timeout(() => this.video = url);
  });
}
