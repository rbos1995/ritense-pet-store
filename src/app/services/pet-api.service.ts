import { Injectable } from '@angular/core';
import {Pet} from "../types/pet.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetApiService {

  private baseURL= 'https://petstore3.swagger.io/api/v3';
  private refreshSubject = new Subject<void>();

  constructor(
    private http: HttpClient
  ) { }

  private transformPet(pet: any): Pet {
    return {
      id: pet.id,
      name: pet.name,
      status: pet.status,
    };
  }

  getPetsByStatus(status: string): Observable<Pet[]> {
    const url = `${this.baseURL}/pet/findByStatus?status=${status}`;
    return this.http.get<any[]>(url).pipe(
      map((pets: Pet[]) => pets.map((pet) => this.transformPet(pet)))
    );

  }

  addPet(pet: Pet): Observable<Pet> {
    const url = `${this.baseURL}/pet`;
    return this.http.post<any>(url, pet).pipe(
      map((response) => this.transformPet(response)),
      map((newPet) => {
        this.refreshSubject.next(); // Emit signal to refresh the pet list
        return newPet;
      })
    );
  }
  get refreshSignal$(): Observable<void> {
    return this.refreshSubject.asObservable();
  }
}
