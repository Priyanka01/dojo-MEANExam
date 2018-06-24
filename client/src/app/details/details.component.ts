import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  pet:any;
  constructor(private _route:ActivatedRoute,private _httpService: HttpService,private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.details(params['id']));
  }


  details(id){
    console.log("details",id)
    let observable = this._httpService.getOnePet(id)
    observable.subscribe(data=>{
      console.log("data",data)
      this.pet = data
      console.log("details",this.pet.name)
    })

  }

  likePet(pet){

    let observable = this._httpService.addLike(this.pet)

    observable.subscribe(data => {
      console.log("data",data)
      this.pet = data
    })
    this._router.navigate(['/pets']);
    // this.details()
  }

  adoptPet(pet){
    console.log("&&&&&&&&&&",pet)

    let observable = this._httpService.deletePet(pet)
    observable.subscribe(data => {
      console.log("deletePet data",data)
    })
    this._router.navigate(['/pets']);
    // this.getAll()
  }
}
