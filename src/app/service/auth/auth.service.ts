import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from 'src/app/model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;
  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = this.fireAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          const { displayName, email, photoURL }: User = user;
          const defaltAvatar: string = 'assets/images/default-avatar.jpg';
          const photo: string = photoURL ? photoURL : defaltAvatar;
          const currentUser: User = { displayName, email, photoURL: photo };
          return of(currentUser);
        } else {
          return of(null);
        }
      })
    );
  }

  loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.fireAuth.signInWithPopup(provider);
  }

  login(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  signup(email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }
}
