import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { PageService } from 'src/app/services/page.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [ FormsModule],
})
export class HeaderComponent implements OnInit {

  search_term:string = '';
  users: any[] = [];
  current_page:number = 0;

  constructor(
    private userService: UserService,
    private pageService: PageService
  ) { }

  ngOnInit(): void {
    this.pageService.currentPage$.subscribe(
      page => {
        this.current_page = page
      }
    )
    this.userService.currentUserList.subscribe(users => {
      this.users = users
    })
    this.getUsers(this.current_page);
  }

  getUsers(page_number: number) {
    this.userService.getRequest(`users?page=${page_number}`).subscribe(res => {
      this.userService.updateUsers(res.data);
      this.users = res.data;
    })
  }

  searchUsers() {
    if(!this.search_term) {
    } else {
      const query = Number(this.search_term);
      this.users = this.users.filter(user => user.id === query);
      this.userService.updateUsers(this.users);
    }
  }
}
