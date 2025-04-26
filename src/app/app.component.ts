import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {DonationPageComponent} from './donation-page/donation-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DonationPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GachiDonationFront';
}
