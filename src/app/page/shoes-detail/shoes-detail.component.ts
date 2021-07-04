import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmBoxComponent } from 'src/app/component/confirm-box/confirm-box.component';
import { FormModalComponent } from 'src/app/component/form-modal/form-modal.component';
import { Shoes } from 'src/app/model/shoes.model';
import { ShoesService } from 'src/app/service/shoes/shoes.service';

@Component({
  selector: 'app-shoes-detail',
  templateUrl: './shoes-detail.component.html',
  styleUrls: ['./shoes-detail.component.css']
})
export class ShoesDetailComponent implements OnInit {
  shoes: Shoes;
  constructor(private route: ActivatedRoute, private shoesService: ShoesService, public dialog: MatDialog, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id')
    this.shoesService.shoes$.subscribe(data => {
      this.shoes = data.find(shoes => shoes.id === id)
    })

  }

  ngOnInit(): void {
    if (!this.shoes) {
      this.router.navigate(['error'])
    }

  }

  openDialog(): void {
    this.dialog.open(FormModalComponent, {
      data: this.shoes
    });
  }
  openConfirmBox() {
    const dialogRef = this.dialog.open(ConfirmBoxComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.shoesService.deleteDoc(this.shoes.id).then(() => {
        this.router.navigateByUrl('/admin')
      })
    })
  }
}
