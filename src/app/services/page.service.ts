import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private currentPageSubject = new BehaviorSubject<number>(1);
  private userNotFoundSubject = new BehaviorSubject<boolean>(true);

  currentPage$ = this.currentPageSubject.asObservable();
  notFound$ = this.userNotFoundSubject.asObservable();

  updateCurrentPage(newPage: number) {
    this.currentPageSubject.next(newPage);
  }

  updateNotFound(is_found: boolean) {
    this.userNotFoundSubject.next(is_found);
  }

  getCurrentPage() {
    return this.currentPageSubject.getValue();
  }
}
