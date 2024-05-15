import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService {

  private currentPageSubject = new BehaviorSubject<number>(1);

  currentPage$ = this.currentPageSubject.asObservable();

  updateCurrentPage(newPage: number) {
    this.currentPageSubject.next(newPage);
  }

  getCurrentPage() {
    return this.currentPageSubject.getValue();
  }
}
