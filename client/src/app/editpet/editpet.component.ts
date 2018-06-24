import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-editpet',
  templateUrl: './editpet.component.html',
  styleUrls: ['./editpet.component.css']
})
export class EditpetComponent implements OnInit {

  petObj:any;
  constructor(private _route:ActivatedRoute,private _httpService: HttpService,private _router: Router) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => this.details(params['id']));
  }


  details(id){
    console.log("details",id)
    let observable = this._httpService.getOnePet(id)
    observable.subscribe(data=>{
      console.log("data",data)
      this.petObj = data
    })

  }

  editPet(pet){
 
    console.log("details")
    let observable = this._httpService.editOnePet(pet)
    observable.subscribe(data=>{
      console.log("data",data)
      this.petObj = data
    })
    this._router.navigate(['/pets']);
  
  }
}

