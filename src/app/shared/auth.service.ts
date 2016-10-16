import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { User } from './user';

declare var firebase;

@Injectable()
export class AuthService {

  public createUser(user: User): Observable<string> {
    const state = new Subject<string>();
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(function(firebaseUser) {
        console.log(firebaseUser.uid);
        state.next(null);
      })
      .catch(function(error) {
        console.log('Error: code: ' + error.code + ' message: ' + error.message);
        state.next(error.message);
      });
      return state.asObservable();
  }

  public login(user: User): Observable<string> {
    const state = new Subject<string>();
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
      .then(function(firebaseUser) {
        console.log(firebaseUser.uid);
        state.next(null);
      })
      .catch(function(error) {
        console.log('Error: code: ' + error.code + ' message: ' + error.message);
        state.next(error.message);
      });
      return state.asObservable();
  }

  public logout(): Observable<boolean> {
    const state = new Subject<boolean>();
    firebase.auth().signOut()
      .then(function() {
        state.next(true);
      });
      return state.asObservable();
  }

}
