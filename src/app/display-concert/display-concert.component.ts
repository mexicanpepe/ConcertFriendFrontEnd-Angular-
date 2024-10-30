import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConcertFriendService } from '../../service/concert-friend.service';
import { Concert } from '../../models/concert.model';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-concert',
  standalone: true,
  imports: [CommonModule, NgIf, FormsModule],
  templateUrl: './display-concert.component.html',
  styleUrls: ['./display-concert.component.css']
})
export class DisplayConcertComponent implements OnInit {
  concert: Concert | null = null;
  isEditMode: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private concertFriendService: ConcertFriendService
  ) {}

  ngOnInit(): void {
    // Get the concert ID from the route
    const concertId = this.route.snapshot.paramMap.get('id');
    if (concertId) {
      // Fetch the concert details from the service
      this.concertFriendService.getConcertById(+concertId).subscribe(
        (concertArray: Concert[]) => {
          if (concertArray.length > 0) {
            //first concert from array since api response returns an array
            this.concert = concertArray[0];
            console.log('Concert details fetched:', this.concert);
          } else {
            console.error('No concert found for the given ID');
          }
        },
        (error) => {
          console.error('Error fetching concert details:', error);
        }
      );
    }
  }

    // update to true to be able to edit concert
    enableEdit(): void {
      this.isEditMode = true;
    }

    //update concert details
    updateConcert(): void {
      if (this.concert) {
        this.concertFriendService.updateConcert(this.concert).subscribe(
          () => {
            console.log('Concert updated successfully');
            //back to false
            this.isEditMode = false;
          },
          (error) => {
            console.error('Error updating concert:', error);
          }
        );
      }
    }

    cancelEdit(): void {
      this.isEditMode = false;
      this.ngOnInit();
    }

}
