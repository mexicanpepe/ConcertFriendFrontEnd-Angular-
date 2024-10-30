import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConcertFriendService } from '../../service/concert-friend.service';
import { NewConcert } from '../../models/NewConcert.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-concert',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-concert.component.html',
  styleUrls: ['./create-concert.component.css']
})
export class CreateConcertComponent implements OnInit {
  concert: NewConcert = {
    artist_id: 0,
    //default user since there is only one user
    user_id: 1,
    venue: '',
    date: '',
    setlist: '',
    media: ''
  };

  constructor(
    private concertFriendService: ConcertFriendService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //grab the specific artist id
    this.route.queryParams.subscribe(params => {
      this.concert.artist_id = +params['artistId'];
    });
  }


  submitConcert(): void {
    this.concertFriendService.addConcert(this.concert).subscribe(
      () => {
        console.log('Concert added successfully');
        this.router.navigate(['/list-concerts']);
      },
      (error) => {
        console.error('Error adding concert:', error);
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/list-artists']);
  }
}
