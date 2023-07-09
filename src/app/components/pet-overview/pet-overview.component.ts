import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Pet} from "../../types/pet.model";
import {PetApiService} from "../../services/pet-api.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-pet-overview',
  templateUrl: './pet-overview.component.html',
  styleUrls: ['./pet-overview.component.scss'],
})
export class PetOverviewComponent implements OnInit, OnDestroy {

  pets!: Pet[];
  private unsubscribe$ = new Subject<void>();

  displayedColumns = ['id', 'name', 'status'];
  constructor(
    private petApiService:PetApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filterPets('available')

    this.petApiService.refreshSignal$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.filterPets('available'));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  filterPets(status: string) {
    this.petApiService.getPetsByStatus(status).subscribe((pets) => {
      this.pets = pets
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddPetDialog);

    dialogRef.afterClosed().subscribe()
  }
}

@Component({
  selector: 'add-pet-dialog',
  templateUrl: 'add-pet-dialog-content.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatInputModule, MatSelectModule, ReactiveFormsModule, CommonModule],
})
export class AddPetDialog {
  petForm!: FormGroup;

  constructor(private petService: PetApiService ) {

    this.petForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      status: new FormControl('available', [Validators.required])
    })
  }

  addPet() {
    if (this.petForm.valid) {
      const newPet: Pet = {
        id: Math.floor(Math.random() * 100),
        name: this.petForm.value.name,
        status: this.petForm.value.status
      }
      this.petService.addPet(newPet).subscribe();
      this.petForm.reset();
    }
  }
}
