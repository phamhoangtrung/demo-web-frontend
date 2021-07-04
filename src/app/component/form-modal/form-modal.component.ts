import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shoes } from 'src/app/model/shoes.model';
import { ShoesService } from 'src/app/service/shoes/shoes.service';
import { NumberValidator } from 'src/app/share/number-validator';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.css'],
})
export class FormModalComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private shoesService: ShoesService,
    readonly dialogRef: MatDialogRef<FormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Shoes
  ) {
    this.addForm = this.fb.group({
      name: [this.data.name ? this.data.name : "", [Validators.required, Validators.minLength(4)]],
      type: [this.data.type ? this.data.type : "", [Validators.required, Validators.minLength(4)]],
      quantity: [this.data.quantity ? this.data.quantity : "", [Validators.required, Validators.min(0), Validators.max(100), NumberValidator]],
      price: [this.data.price ? this.data.price : "", [Validators.required, Validators.min(1), NumberValidator]],
    });
  }

  ngOnInit(): void { }
  onSubmit() {
    if (this.addForm.invalid) {
      return;
    }
    const item: Shoes = {
      name: this.addForm.controls['name'].value,
      type: this.addForm.controls['type'].value,
      quantity: this.addForm.controls['quantity'].value,
      price: this.addForm.controls['price'].value,
    };
    if (this.data.id) {
      item.id = this.data.id
      this.shoesService.updateDoc(item).then(() => {
        this.dialogRef.close()
      });
    } else {
      this.shoesService.addDoc(item).then(() => {
        this.dialogRef.close()
      });
    }

  }
}


