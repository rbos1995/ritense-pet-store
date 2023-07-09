import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Pet} from "../../types/pet.model";
import {PetApiService} from "../../services/pet-api.service";

@Component({
  selector: 'app-pet-overview',
  templateUrl: './pet-overview.component.html',
  styleUrls: ['./pet-overview.component.scss'],
})
export class PetOverviewComponent implements OnInit {

  pets!: Pet[];
  constructor(
    private petApiService:PetApiService
  ) {}

  ngOnInit() {
    this.filterPets()
  }

  filterPets() {
    // filter from api
    this.pets = this.petApiService.getPetsByStatus()
  }
}
