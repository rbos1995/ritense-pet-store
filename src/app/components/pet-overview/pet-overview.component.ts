import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Pet} from "../../types/pet.model";
import {PetApiService} from "../../services/pet-api.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-pet-overview',
  templateUrl: './pet-overview.component.html',
  styleUrls: ['./pet-overview.component.scss'],
})
export class PetOverviewComponent implements OnInit {

  pets!: Pet[];
  displayedColumns = ['id', 'name', 'status']
  constructor(
    private petApiService:PetApiService
  ) {}

  ngOnInit() {
    this.filterPets('available')
  }

  filterPets(status: string) {
    this.petApiService.getPetsByStatus(status).subscribe((pets) => {
      this.pets = pets
    })
  }

  protected readonly filter = filter;
}
