import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemplateDrivenComponent } from "./components/template-driven/template-driven.component";
import { ReactiveFormsComponent } from "./components/reactive-forms/reactive-forms.component";
import { NgContentComponent } from "./components/ng-content/ng-content.component";
import { ConsumeServiceComponent } from "./components/consume-service/consume-service.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplateDrivenComponent, ReactiveFormsComponent, NgContentComponent, ConsumeServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'udemy-Angular';
}
