import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email : string = '';
  password : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

  checkEmail() {
    if (this.email == '') {
      return 'black';
    }
    if (this.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      return 'green';
    } else {
      return 'red';
    }
  }

  register() {

    if (this.email == '') {
      alert('Please enter email');
      return;
    }
    if (this.password == '') {
      alert('Please enter password');
      return;
    }

    if (this.checkEmail() === 'green') {
      this.auth.register(this.email, this.password);
    } else {
      alert('Wrong fields');
      return;
    }
    
    this.email = '';
    this.password = '';
    
  }
}
