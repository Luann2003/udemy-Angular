import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.scss'
})
export class ReactiveFormsComponent {

  #fb = inject(FormBuilder)

  public profileForm = this.#fb.group({
    name: [''],
    myStacks: this.#fb.group({
      front: ['Angular'],
      back: ['Java']
    }),
    myFavoriteFoods: this.#fb.array([['X-TUDO']]),
  });


  public update(){
    this.profileForm.patchValue({
      name: 'Maria',
      myStacks:{
        front: "Vue",
        back: "NextJs"
      }
    })
  }

  public addFoods(newFood: string){
    const myFavoriteFoods = this.profileForm.get('myFavoriteFoods') as FormArray;
    const addFood = new FormControl(newFood)

    myFavoriteFoods.push(addFood);
  }

}
