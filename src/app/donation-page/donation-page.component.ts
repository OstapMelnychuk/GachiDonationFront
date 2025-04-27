import {Component, OnInit, ViewChild} from '@angular/core';
import {FormsModule, NgForm, NgModel} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {DonationRequestDto} from '../model/DonationRequestDto';

@Component({
  selector: 'app-donation-page',
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './donation-page.component.html',
  styleUrl: './donation-page.component.css'
})
export class DonationPageComponent implements OnInit {

  public gachiPhrases: string[] = [];
  public gachiPhrasesGrid: string[][] = [[], [], [], []];
  public donationMessage: string = '';
  public donatorNickname: string = '';
  @ViewChild('donationMessageInput') donationMessageInput!: NgModel;
  private currentAudio: HTMLAudioElement | null = null;
  // private host = 'https://1e19-213-109-233-73.ngrok-free.app'
  private host = 'http://localhost:8080'

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.http.get<string[]>(this.host + '/translate/gachi').subscribe(res => {
      this.gachiPhrases = res;
      console.log(this.gachiPhrases);
      this.splitIntoRows(4);
    });
  }

  private stopCurrentAudio(): void {
    if (this.currentAudio) {
      this.currentAudio.pause();  // Pause the current audio
      this.currentAudio.currentTime = 0;  // Reset the audio to the start
    }
  }

  private splitIntoRows(rowCount: number): void {
    // Clear previous grid
    this.gachiPhrasesGrid = Array.from({ length: rowCount }, () => []);

    // First, we need to distribute the phrases row by row without breaking their order
    const phrasesPerRow = Math.ceil(this.gachiPhrases.length / rowCount);

    for (let i = 0; i < this.gachiPhrases.length; i++) {
      const rowIndex = Math.floor(i / phrasesPerRow); // Determine which row this phrase should go into
      this.gachiPhrasesGrid[rowIndex].push(this.gachiPhrases[i]);
    }

    // Log to ensure phrases are distributed properly
    console.log(this.gachiPhrasesGrid);
  }

  public addPhraseToMessage(phrase: string): void {
    this.donationMessage += (this.donationMessage ? ' ' : '') + phrase;

    setTimeout(() => {
      this.donationMessageInput.control.markAsTouched();
      this.donationMessageInput.control.markAsDirty();
      this.donationMessageInput.control.updateValueAndValidity();
    });
  }


  public onSubmit(form: NgForm): void {
    const requestDto: DonationRequestDto = {
      donatorNickname: this.donatorNickname,
      donationMessage: this.donationMessage.replaceAll('  ', ' ')
    };

    console.log('Sending donation:', requestDto);

    this.http.post(this.host + '/translate', requestDto).subscribe();
  }

  playPhraseAudio(phrase: string): void {
    this.stopCurrentAudio();

    const audioUrl = this.host + `/gachi/play?filename=${encodeURIComponent(phrase)}`;
    this.currentAudio = new Audio(audioUrl);

    this.currentAudio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  }

  testPhrase() {
    const audio = new Audio(this.host + '/gachi/test?message=' + this.donationMessage + '&donatorNickname=' + this.donatorNickname);
    audio.play();
  }
}
