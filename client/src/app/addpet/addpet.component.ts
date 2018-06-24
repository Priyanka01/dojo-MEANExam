import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addpet',
  templateUrl: './addpet.component.html',
  styleUrls: ['./addpet.component.css']
})
export class AddpetComponent implements OnInit {
  petObj:any;
  err:any;
  constructor(private _httpService: HttpService,private _router: Router) { 
    this.petObj = {name : "",pettype: "", description:"",skill1:"",skill2:"",skill3:""}
  }

  ngOnInit() {
    this.petObj = {name : "",pettype: "", description:"",skill1:"",skill2:"",skill3:""}
    // this.err = ""
  }

  newPet(){
    console.log("new pet",this.petObj)
    let observable = this._httpService.addPet(this.petObj)
    observable.subscribe(data => {
      console.log("ERORR",data)
      if(data['errors']){
        this.err = data
        console.log("***",this.err)
      }
      
      else{
        this.err = ""
        this.petObj = {name : "",pettype: "", description:"",skill1:"",skill2:"",skill3:""}
        console.log("data from server",data)
        this._router.navigate(['/pets']);
      }
    });
  }



}
