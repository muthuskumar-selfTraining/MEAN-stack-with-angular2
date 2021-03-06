import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { BlogService } from '../../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

    message;
    messageClass;
    processing = false;
    blog = {
	_id: 0,
	title: null,
	body: null
    }
    blogId;
    loading = true;
    
    constructor(
	private location: Location,
	private activatedRoute: ActivatedRoute,
	private blogService: BlogService,
	private router: Router
    ) { }

    updateBlogSubmit() {
	this.processing = true;
	this.blogService.editBlog(this.blog)
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		    this.processing = false;
		} else {
		    this.processing = false;
		    setTimeout(() => {
			this.router.navigate(['/blog']);
		    }, 2000);
		    
		}
	    });
    }

    goBack() {
	this.location.back();
    }
    
    ngOnInit() {
	this.blogId = this.activatedRoute.snapshot.params;

	this.blogService.getSingleBlog(this.blogId.id)
	    .subscribe(data => {
		if (!data.success) {
		    this.messageClass = 'alert alert-danger';
		    this.message = data.message;
		} else {
		    this.blog = data.blog;
		    this.loading = true;
		}
	    });
    }

}
