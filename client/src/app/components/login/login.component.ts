import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { AuthGuard } from '../..//guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    processing = false;
    message;
    messageClass;
    previousUrl;
    
    constructor(
	private formBuilder: FormBuilder,
	private router: Router,
	private authService: AuthService,
	private authGuard: AuthGuard
    ) {
	this.createForm();
    }

    createForm() {
	this.loginForm = this.formBuilder.group({
	    username: ['', Validators.required],
	    password: ['', Validators.required]
	});
    }

    disableForm() {
	this.loginForm.controls['username'].disable();
	this.loginForm.controls['password'].disable();
    }

    enableForm() {
	this.loginForm.controls['username'].enable();
	this.loginForm.controls['password'].enable();
    }

    onLoginSubmit() {
	this.processing = true;
	this.disableForm();

	const user = {
	    username: this.loginForm.get('username').value,
	    password: this.loginForm.get('password').value
	}

	this.authService.login(user).subscribe(data => {
	    if (!data.success) {
		this.messageClass = 'alert alert-danger';
		this.message = data.message;
		this.processing = false;
		this.enableForm();
	    } else {
		this.messageClass = 'alert alert-success';
		this.message = data.message;
		this.authService.storeUserData(data.token, data.user);

		setTimeout(() => {
		    if (this.previousUrl) {
			this.router.navigate([this.previousUrl]);
		    } else {
			this.router.navigate(['/dashboard']);
		    }
		}, 2000);
	    }
	});
	
    }
    ngOnInit() {
	if (this.authGuard.redirectUrl) {
	    this.messageClass = 'alert alert-danger';
	    this.message = 'You must be logged in to view the page.';

	    this.previousUrl = this.authGuard.redirectUrl;
	    this.authGuard.redirectUrl = undefined;
	}
    }

}
