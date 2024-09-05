import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './template-driven.component.html',
  styleUrl: './template-driven.component.scss'
})
export class TemplateDrivenComponent {
  public listComidas = signal<Array<{comida: string, preco: string}>>([
    {
      comida: 'x-salada', preco: 'R$ 10'
    },
    {
      comida: 'x-bacon', preco: 'R$ 15'
    },
    {
      comida: 'x-Tudo', preco: 'R$ 20'
    },
  ]);

  public submitForm(form: NgForm){
    console.log(form.valid);
    if(form.valid){
      console.log(form.value)
    }
  }

}
