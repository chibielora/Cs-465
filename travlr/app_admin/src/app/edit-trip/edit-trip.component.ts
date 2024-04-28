import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})

export class EditTripComponent implements OnInit {

  public editForm! : FormGroup;
  trip! : Trip;
  submitted = false;
  message : string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) { }

  ngOnInit() : void {

    // retrieve stashed tripId
    let tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditTripComponent#onInit found tripCode ' + tripCode);
    console.log('tripcode:' + tripCode);

    // initialize form builder
    this.editForm = this.formBuilder.group({
      _id: [],
      tripCode: [tripCode],
      code: [tripCode, Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })

    console.log('EditTripComponent#onInit found TripDataService#getTrip(\'' + tripCode + '\')');
    
    // Check if it's tripDataService or private tripService
    this.tripService.getTrip(tripCode)
      .then(data => {
        console.log(data);
        this.editForm.patchValue(data);
      })
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .then(data => {
            console.log(data);
            this.router.navigate(['']);
        })
    }
  }
  get f() {
    return this.editForm.controls;
  }  
}