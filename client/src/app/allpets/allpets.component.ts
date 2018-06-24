import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { NavigationEnd,Event, Router } from '@angular/router';


@Component({
  selector: 'app-allpets',
  templateUrl: './allpets.component.html',
  styleUrls: ['./allpets.component.css']
})
export class AllpetsComponent implements OnInit {

  pet_data:any;
  constructor(private _httpService: HttpService,private _router:Router) {
    // _router.events.subscribe((event:Event)=> {
    //   if(event instanceof NavigationEnd){
    //     console.log("Called")
    //     this.getAll()
    //   }
    // })
   }

  ngOnInit() {
    this.getAll()
  }

  getAll(){
    console.log("getAll")
    let observable = this._httpService.getAllPets()
    observable.subscribe(data => {
      console.log("data",data)
      this.pet_data = data
    })
  }

}
