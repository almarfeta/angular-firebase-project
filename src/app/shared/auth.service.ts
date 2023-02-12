import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth : AngularFireAuth, private router : Router) { }

  authState$: Observable<firebase.default.User | null> = this.fireAuth.authState;

  //login method
  login(email : string, password : string) {
    this.fireAuth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      localStorage.setItem('email', email);
      this.router.navigate(['/dashboard']);
    }, () => {
      alert('Email or password wrong');
      this.router.navigate(['/login']);
    })
  }

  //register method
  register(email : string, password : string) {
    this.fireAuth.createUserWithEmailAndPassword(email, password).then(() => {
      alert('Register successful');
      this.router.navigate(['/login']);
    }, () => {
      alert('Error while trying to register');
      this.router.navigate(['/register']);
    })
  }

  //sign out method
  logout() {
    this.fireAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      this.router.navigate(['/login']);
    }, () => {
      alert('Something went wrong while trying to sign out');
    })
  }

}
