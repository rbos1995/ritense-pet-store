import { Injectable } from '@angular/core';
import {Pet} from "../types/pet.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetApiService {
  PET_DATA: Pet[] = [
    { id: '1', name: 'Dog', status: 'available'},
    { id: '2', name: 'Albert', status: 'available'},
    { id: '3', name: 'Lorem', status: 'pending'},
    { id: '4', name: 'Lily', status: 'sold'},
    { id: '5', name: 'Reggie', status: 'sold'},
  ]

  private url= 'https://petstore3.swagger.io/api/v3'
  constructor(
    private http: HttpClient
  ) { }

  getPetsByStatus(status: string): Observable<Pet[]> {
    const url = `${this.url}/pet/findByStatus?status=${status}`;
    return this.http.get<any[]>(url).pipe(
      map((pets: Pet[]) => pets.map((pet) => this.transformPet(pet)))
    );

  }
  private transformPet(pet: any): Pet {
    return {
      id: pet.id,
      name: pet.name,
      status: pet.status,
    };
  }

}
