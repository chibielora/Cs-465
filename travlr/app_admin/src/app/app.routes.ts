import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddTripComponent } from "./add-trip/add-trip.component";
import { EditTripComponent } from "./edit-trip/edit-trip.component";
import { LoginComponent } from "./login/login.component";
import { TripListingComponent } from "./trip-listing/trip-listing.component";

const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent },
    { path: 'edit-trip', component: EditTripComponent },
    { path: 'login', component: LoginComponent },
    { path: 'list-trips', component: TripListingComponent },
    { path: '', component: TripListingComponent, pathMatch: 'full' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }