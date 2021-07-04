import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchKey$ = new BehaviorSubject("");
  constructor() { }
  searching(keyword = "") {
    this.searchKey$.next(keyword)
  }
}
