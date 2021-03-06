import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    message;
    messageClass;
    processing = false;
    emailAvailable = true;
    emailAvailabilityMessage;
    usernameAvailable = true;
    usernameAvailabilityMessage;
    
    constructor(
	private registerFormBuilder: FormBuilder,
	private authService: AuthService,
	private router: Router
    ) {
	this.createForm();
    }

    createForm() {
	this.registerForm = this.registerFormBuilder.group({
	    username: ['', Validators.compose([
		Validators.required,
		Validators.minLength(3),
		Validators.maxLength(15),
		this.validateUsername
	    ])],
	    email: ['', Validators.compose([
		Validators.required,
		Validators.minLength(5),
		Validators.maxLength(30),
		Validators.email
	    ])],
	    password: ['', Validators.compose([
		Validators.required,
		Validators.minLength(8),
		Validators.maxLength(35),
		this.validatePassword
	    ])],
	    confirmPassword: ['', Validators.required]
	}, { validator: this.matchingPasswords('password', 'confirmPassword') });
    }

    validateUsername(controls) {
	const usernameRegExp = new RegExp(/^[a-zA-Z0-9]+$/);
	if (usernameRegExp.test(controls.value)) {
	    return null;
	} else {
	    return { 'validateUsernameError': true }
	}
    }

    validatePassword(controls) {
	const passwordRegExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
	if(passwordRegExp.test(controls.value)){
	    return null;
	} else {
	    return { 'validatePasswordError': true }
	}
    }

    matchingPasswords(password, confirmPassword) {
	return (group: FormGroup) => {
	    if (group.controls[password].value === group.controls[confirmPassword].value) {
		return null;
	    } else {
		return { 'matchingPasswordsError': true }
	    }
	}
    }

    checkEmailAvailability() {
	if (this.registerForm.get('email').value) {
	    this.authService.checkEmailAvailability(this.registerForm.get('email').value)
		.subscribe(data => {
		    if (!data.success) {
			this.emailAvailable = false;
			this.emailAvailabilityMessage = data.message;
		    } else {
			this.emailAvailable = true;
			this.emailAvailabilityMessage = data.message;
		    }
		});
	}
    }

    checkUsernameAvailability() {
	if (this.registerForm.get('username').value) {
	    this.authService.checkUsernameAvailability(this.registerForm.get('username').value)
		.subscribe(data => {
		    if (!data.success) {
			this.usernameAvailable = false;
			this.usernameAvailabilityMessage = data.message;
		    } else {
			this.usernameAvailable = true;
			this.usernameAvailabilityMessage = data.message;
		    }
		});
	}
    }
    
    disableForm() {
	this.registerForm.controls['email'].disable();
	this.registerForm.controls['username'].disable();
	this.registerForm.controls['password'].disable();
	this.registerForm.controls['confirmPassword'].disable();
    }

    enableForm() {
	this.registerForm.controls['email'].enable();
	this.registerForm.controls['username'].enable();
	this.registerForm.controls['password'].enable();
	this.registerForm.controls['confirmPassword'].enable();
    }
    
    onRegistrationSubmit() {
	this.processing = true;
	this.disableForm();
	
	const user = {
	    email: this.registerForm.get('email').value,
	    username: this.registerForm.get('username').value,
	    password: this.registerForm.get('password').value
	}

	this.authService.registerUser(user)
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		    this.processing = false;
		    this.enableForm();		    
		} else {
		    this.messageClass = 'alert alert-success';
		    this.message = data.message;
		    setTimeout(() => {
			this.router.navigate(['/login']);
		    }, 2000);
		}
	    });
    }
    
    ngOnInit() {
    }

}
