import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addPet(petObj){
    console.log("addPet",petObj)
    return this._http.post('/create',petObj);
  }

  getAllPets(){
    console.log("getAllPets")
    return this._http.get('/getall');
  }

  getOnePet(petid){
    console.log("getOnePet")
    return this._http.get('/getone'+petid);
  }

  addLike(petObj){
    console.log("addLike",petObj)
    return this._http.put('/addlike',petObj)
  }

  editOnePet(petObj){
    console.log("updatePet",petObj)
    return this._http.put('/update',petObj)
  }

  
  deletePet(pet){
    return this._http.delete('/removepet/'+pet._id)
  }

}
