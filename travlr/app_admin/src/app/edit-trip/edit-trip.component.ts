import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trips';

@Component({
  selector: 'app-edit-trip',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-trip.component.html',
  styleUrl: './edit-trip.component.css'
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
      .subscribe({
        // console.log(data);
        next : (value : any) => {
          this.trip = value;
          // Populate our record into the form
          this.editForm.patchValue(value[0]);

          if(!value) {
            this.message = 'No Trip Retrieved!';
          } else {
            this.message = 'Trip:' + tripCode + 'Retrieved';
          }
          console.log(this.message)
        },

        error : (error : any) => {
          console.log('Error' + error);
        }
    })
  }

  public onSubmit() {
    this.submitted = true;

    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value.tripCode, this.editForm.value)
        .subscribe({
          next : (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error : (error : any) => {
            console.log('Error' + error);
          }
        })
    }
  }
  get f() {
    return this.editForm.controls;
  }  
}