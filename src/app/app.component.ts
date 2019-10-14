import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cinemaList: { Id:number, Name: string, Address: string}[] = [];
  cinemaDetails: Object = {};

  unstartedProjections: any[] = [];
  projectionDetails: Object = {};

  reservationId: number = 0;
  roomId: number = 0;
  movieId: number = 0;
  startDate: Date = new Date();

  row: number = 0;
  column: number = 0;

  reservationProjectionId: number = 0;
  reservationRow: number = 0;
  reservationColumn: number = 0;
  reservationMsg = "";

  canceledReservationMsg: string = "";

  constructor(private http: HttpClient) {
    let dateString = '2019-10-29T02:20:00' 
    this.startDate = new Date(dateString);
  }

  onGetCinema(id: number){

    this.http.get("http://localhost:50715/api/cinema/getCinema/" + id)
      .subscribe(res => {
        this.cinemaDetails = res;
      });
  }

  onGetCinemaList(){

    this.http.get("http://localhost:50715/api/cinema/getCinemaList")
      .subscribe((res: { Id:number, Name: string, Address: string}[]) => {
        this.cinemaList = res;
      });
  }

  onGetUnstarted(){

    this.http.get("http://localhost:50715/api/projection/getUnstarted")
      .subscribe((res: any[]) => {
        this.unstartedProjections = res;
      });
  }

  onGetProjection(id: number){

    this.http.get("http://localhost:50715/api/projection/get/" + id)
      .subscribe(res => {
        this.projectionDetails = res;
      });
  }

  onMakeReservation(){

    const model = { projectionId: this.reservationProjectionId, row: this.reservationRow, column: this.reservationColumn}

    this.http.post(`http://localhost:50715/api/reservation/make`, model )
      .subscribe(res => {
        console.log("Reservation..", res);
      });
  }

  onCancelReservation(){

    this.http.post(`http://localhost:50715/api/reservation/cancel/${this.reservationId}`, null )
      .subscribe(res => {
        console.log("Cancel..", res);
      });
  }

  onCreateProjection(){

    const model = { roomId: this.roomId, movieId: this.movieId, startDate: this.startDate}

    this.http.post(`http://localhost:50715/api/projection/create/`, model )
      .subscribe(res => {
        console.log("Create..", res);
      });
  }
}
