import { Component, OnInit } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule, NgStyle } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, HeaderComponent, CommonModule]
})
export class DashboardComponent implements OnInit {

  users: User[] = [];
  is_loading:boolean = true;
  current_page:number = 0;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUsers(1);
  }

  loadUsers(page_number: number) {
    this.userService.getRequest(`users?page=${page_number}`).subscribe(res => {
      this.users = res.data;
      console.log(this.users);
      this.current_page = page_number;
      this.is_loading = false;
    })
  }
}
