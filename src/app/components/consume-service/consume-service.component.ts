import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NewComponent } from '../new/new.component';

@Component({
  selector: 'app-consume-service',
  standalone: true,
  imports: [CommonModule, NewComponent],
  templateUrl: './consume-service.component.html',
  styleUrl: './consume-service.component.scss'
})
export class ConsumeServiceComponent implements OnInit{

  constructor(
    private apiService: ApiService
  ){};

  public getListTask = this.apiService.getListTask;
  public getTaskListError = this.apiService.getListTaskError;

  public getTaskId = this.apiService.getTaskId;
  public getTaskIdError = this.apiService.getTaskIdError;

  public getTaskCreateError = this.apiService.getTaskCreateError;

  public getTaskUpdateError = this.apiService.getTaskUpdateError;

  public getTaskDeleteError = this.apiService.getTaskDeleteError;

  ngOnInit(): void {
    this.apiService.httpListTask$().subscribe();
    this.apiService.httpTaskId$("1ucrZW9QDn2WKa7bRgyV").subscribe();
  }

  public httpTaskCreate(title: string){
    return this.apiService.httpTaskCreate$(title).subscribe({
      next: (next) => this.apiService.httpListTask$().subscribe(), 
      error: (error) => console.log(error)
      }
    );
  }

  public httpTaskUpdate(id: string, title: string){
    return this.apiService.httpTaskUpdate$(id, title).subscribe({
      next: (next) => this.apiService.httpListTask$().subscribe(), 
      error: (error) => console.log(error)
      }
    );
  }
  public httpTaskDelete(id: string){
    return this.apiService.httpTaskDelete$(id).subscribe({
      next: (next) => this.apiService.httpListTask$().subscribe(), 
      error: (error) => console.log(error)
      }
    );
  }
}
