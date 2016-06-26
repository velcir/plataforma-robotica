import {Editor} from '../../../common/services/editor.service';

export const sidenav: angular.IComponentOptions = {
  template: require('./sidenav.component.html'),
  controller: SidenavController
};

SidenavController.$inject = ['Editor'];

function SidenavController(editorService: Editor) {
  const $ctrl = this;

  console.log(editorService, $ctrl);
}
