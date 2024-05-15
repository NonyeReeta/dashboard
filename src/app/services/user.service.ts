import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

interface ResponseObject {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data?: any,
  support: any
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api_link: string = environment.base_url;

  private usersSubject = new BehaviorSubject<User[]>([]);

  currentUserList = this.usersSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
  ) { }

  getRequest(endpoint: string) {
    return this.httpClient.get<ResponseObject>(this.api_link + endpoint);
  }

  updateUsers(new_users: User[]) {
    this.usersSubject.next(new_users)
  }

  getUsers() {
    return this.usersSubject.getValue();
  }
}
