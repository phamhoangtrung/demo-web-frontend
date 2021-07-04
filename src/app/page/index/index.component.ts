import { Component, OnInit } from '@angular/core';
import { ShoesService } from 'src/app/service/shoes/shoes.service';
import { MatDialog } from '@angular/material/dialog';
import { FormModalComponent } from 'src/app/component/form-modal/form-modal.component';
import { Sort } from '@angular/material/sort';
import { Shoes } from 'src/app/model/shoes.model';
import { SearchService } from 'src/app/service/search/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  shoesList: Shoes[] = [];
  shoesTempt: Shoes[] = [];
  keyword: string
  constructor(public searchService: SearchService, public shoesService: ShoesService, public dialog: MatDialog,private router: Router) {
    shoesService.shoes$.subscribe((data) => {
      this.shoesList = data;
      this.shoesTempt = data;
    })
    searchService.searchKey$.subscribe(key => {
      this.shoesTempt = this.shoesList.filter(shoes => shoes.name.includes(key))
    })
  }
  ngOnInit(): void {
  }

  sortData(sort: Sort) {
    const data = this.shoesTempt.slice();
    if (!sort.active || sort.direction === '') {
      this.shoesTempt = data;
      return;
    }

    this.shoesTempt = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'price': return compare(a.price, b.price, isAsc);
        case 'quantity': return compare(a.quantity, b.quantity, isAsc);
        case 'type': return compare(a.type, b.type, isAsc);
        default: return 0;
      }
    })
  }

  openDialog() {
    this.dialog.open(FormModalComponent,{
      data: {}
    });
  }

  checkStatus(quantity) {
    return {
      "status--low": quantity > 0 && quantity <= 10,
      "status--high": quantity > 10,
      "status--over": quantity == 0,
    }
  }
  checkQty(quantity): string {
    if (quantity > 0 && quantity <= 10) return "low"
    if (quantity > 10) return "high"
    if (quantity == 0) return "over"

  }

  navigateToDetails(id){
    this.router.navigateByUrl(`admin/${id}`)
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  // console.log((a < b ? -1 : 1) * (isAsc ? 1 : -1));
  
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}