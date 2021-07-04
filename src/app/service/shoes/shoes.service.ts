import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable, of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shoes } from 'src/app/model/shoes.model';


@Injectable({
  providedIn: 'root'
})
export class ShoesService {
  shoes$: Observable<Shoes[]>

  constructor(private afs: AngularFirestore) {
    this.shoes$ = this.afs.collection('shoes').valueChanges().pipe(map(shoes => {
      return shoes as Shoes[]
    }));
  }
  addDoc(shoes: Shoes) {
    const id = this.afs.createId();
    return this.afs.collection('shoes').doc(id).set({ id, ...shoes })
  }
  deleteDoc(id: string) {
    return this.afs.collection('shoes').doc(id).delete()
  }
  updateDoc(shoes: Shoes) {
    return this.afs.collection('shoes').doc(shoes.id).update(shoes)
  }
}
