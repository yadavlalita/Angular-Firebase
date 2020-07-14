import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm: FormGroup;
  validation_messages = {
   'customerName': [
     { type: 'required', message: 'customerName is required.' }
   ],
   'orderNumber': [
     { type: 'required', message: 'orderNumber is required.' }
   ],
   'order': [
     { type: 'required', message: 'order is required.' },
   ]
 };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      customerName: ['', Validators.required ],
      orderNumber: ['', Validators.required ],
      order: ['', Validators.required ]
    });
  }

  resetFields(){
    this.exampleForm = this.fb.group({
      customerName: new FormControl('', Validators.required),
      orderNumber: new FormControl('', Validators.required),
      order: new FormControl('', Validators.required),
    });
  }

  onSubmit(value){
    this.firebaseService.createOrder(value)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/home']);
      }
    )
  }

}
