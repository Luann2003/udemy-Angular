import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {

  constructor(private apiService : ApiService) {}

  ngOnInit(): void {
    console.log(this.apiService.name());

    this.apiService.name.set('new name')
    setTimeout(() => {
      console.log(this.apiService.name())
    }, 2000);
  }
}
