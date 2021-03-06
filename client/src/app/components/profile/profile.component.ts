import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    username;
    email;
    message;
    messageClass;

    constructor(
	private authService: AuthService
    ) { }

    ngOnInit() {
	this.authService.getProfile()
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message
		} else {
		    this.username = data.user.username;
		    this.email = data.user.email;
		}
	    });
    }

}
