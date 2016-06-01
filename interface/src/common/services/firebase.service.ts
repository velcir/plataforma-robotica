import * as FirebaseLib from 'firebase';
import * as angular from 'angular';

export class Firebase {
  public auth: AngularFireAuth;

  private cache = {};

  /** @ngInject */
  constructor(private FIREBASE_URL, private $firebaseArray, private $firebaseObject,
              $firebaseAuth, private $q) {
    this.auth = $firebaseAuth(new FirebaseLib(this.FIREBASE_URL));
  }

  loadArray(path): AngularFireArray {
    if (!this.cache[path]) {
      this.cache[path] = this.$firebaseArray(new FirebaseLib(this.FIREBASE_URL + path));
    }

    return this.cache[path];
  }

  loadObject(path): AngularFireObject {
    if (!this.cache[path]) {
      this.cache[path] = this.$firebaseObject(new FirebaseLib(this.FIREBASE_URL + path));
    }

    return this.cache[path];
  }

  exists(path) {
    return this.$q((resolve, reject) => {
      const ref = (new FirebaseLib(this.FIREBASE_URL + path));
      ref.once('value', value => resolve(value.exists()), reject);
    });
  }

  unload() {
    angular.forEach(<any[]>this.cache, ref => ref.$destroy());
    this.cache = {};
  }
}
