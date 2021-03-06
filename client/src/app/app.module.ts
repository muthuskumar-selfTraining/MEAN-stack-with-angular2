import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';

import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

import { BlogService } from './services/blog.service';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { DeleteBlogComponent } from './components/blog/delete-blog/delete-blog.component';

@NgModule({
    declarations: [
	AppComponent,
	NavbarComponent,
	HomeComponent,
	DashboardComponent,
	RegisterComponent,
	LoginComponent,
	ProfileComponent,
	BlogComponent,
	EditBlogComponent,
	DeleteBlogComponent
    ],
    imports: [
	BrowserModule,
	FormsModule,
	HttpClientModule,
	ReactiveFormsModule,
	AppRoutingModule,
	FlashMessagesModule.forRoot()
    ],
    providers: [
	AuthService,
	AuthGuard,
	NotAuthGuard,
	BlogService
    ],
    bootstrap: [
	AppComponent
    ]
})
export class AppModule { }
