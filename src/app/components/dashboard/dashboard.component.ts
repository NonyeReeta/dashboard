import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, HeaderComponent, CommonModule]
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  is_loading:boolean = false;
  current_page:number = 1;

  constructor(
    private userService: UserService,
    private pageService: PageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.currentUserList.subscribe(user => {
      if(user.length === 0) {
        this.loadUsers(1);
      } else {
        this.users = user;
      }
    })
   
  }

  loadUsers(page_number: number) {
    this.userService.getRequest(`users?page=${page_number}`).subscribe(res => {
      this.users = res.data;
      this.userService.updateUsers(res.data);
      this.current_page = page_number;
      this.pageService.updateCurrentPage(page_number);
      this.is_loading = false;
    })
  }

  viewUserDetails(id: number) {
    // route to user details page
    this.router.navigate([`/user/${id}`]);
  }
}
