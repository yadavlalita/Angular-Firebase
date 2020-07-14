import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public db: AngularFirestore) {}

  getOrder(userKey){
    return this.db.collection('order').doc(userKey).snapshotChanges();
  }

  updateOrder(userKey, value){
    return this.db.collection('order').doc(userKey).set(value);
  }

  deleteOrder(userKey){
    return this.db.collection('order').doc(userKey).delete();
  }

  getOrders(){
    return this.db.collection('order').snapshotChanges();
  }

  createOrder(value){
    return this.db.collection('order').add({
      customerName: value.customerName,
      orderNumber: value.orderNumber,
      order: value.order
     
    });
  }
}
