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

  constructor(private http: HttpClient) {

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

  inspect(){
    this.http.get("http://localhost:50715/api/projection/inspect")
      .subscribe(res => {
        console.log("Ispected", res);
      });
  }
}
