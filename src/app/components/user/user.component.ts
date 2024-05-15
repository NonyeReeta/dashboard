import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule]
})
export class UserComponent implements OnInit {
  is_loading:boolean = true;
  user!: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.route.paramMap.subscribe(param => {
      const user_id = param.get('id');
      this.userService.getRequest(`users/${user_id}`).subscribe(res => {
        this.user = res.data;
        this.is_loading = false;
      })
    })
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}
