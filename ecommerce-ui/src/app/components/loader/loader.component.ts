import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoaderService } from '../../services/loader.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-loader',
  imports: [AsyncPipe,NgIf],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
constructor(public loader: LoaderService){

}
}
