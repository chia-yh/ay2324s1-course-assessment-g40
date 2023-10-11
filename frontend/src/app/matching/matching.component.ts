import { Component } from '@angular/core';
import { MatchingService } from '../_services/matching.service';
import { NgForm } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { timeoutWith, throwError } from 'rxjs';

@Component({
  selector: 'app-matching',
  templateUrl: './matching.component.html',
  styleUrls: ['./matching.component.css']
})
export class MatchingComponent {

  match: any = undefined

  requested: boolean = false

  queueLength: number = -1

  constructor(private matchingService: MatchingService, private storageService: StorageService){}

  ngOnInit() {
    this.getQueueLength();
  }

  getMatch(userDetails: any) {
    this.matchingService.enqueue(userDetails).pipe(timeoutWith(2000, throwError(() => {
      this.matchingService.dequeue(userDetails["userid"]).subscribe((res) => {
        this.match = "You're request timed out!"
        this.getQueueLength()
      })
    }))).subscribe((res) => {
      console.log(res)
      if (res.message.includes("Matched users:")) {
        this.match = res.message;
        this.getQueueLength()
      }
    })
    this.getQueueLength()
  }

  getQueueLength() {
    this.matchingService.getQueueLength().subscribe((res) => {
      this.queueLength = res.length
    })
  }

  submitMatchingForm(form: NgForm) {
    let obj = Object.assign({}, form.value)
    obj["userid"] = this.storageService.getUser()["id"]
    this.getMatch(obj)
    this.requested = true;
    if (this.match == "You're request timed out!") {
      this.match = "We're trying to match you..."
    }
  }

}