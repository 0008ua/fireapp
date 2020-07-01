import { Component, OnInit, ViewChild } from '@angular/core';
import { FireService } from 'src/app/services/fire.service';
import { Router } from '@angular/router';
import { Feedback } from '../../../interfaces';
import { QueryDocumentSnapshot, CollectionReference, QueryFn } from '@angular/fire/firestore';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, getFeedbackIds, getFeedbackAll } from 'src/app/reducers';
import { LoadFeedbacks, QueryFeedbacksFromDb } from 'src/app/actions/feedback.actions';
import { FormGroup, FormGroupDirective, FormControl, Validators } from '@angular/forms';
import { GoogleLogin, Logout } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  messages: Feedback[];
  firstInCollectionFeedback: QueryDocumentSnapshot<Feedback>;
  lastInCollectionFeedback: QueryDocumentSnapshot<Feedback>;

  constructor(
    public auth: FireService,
    private router: Router,
    private fireService: FireService,
    public store: Store<State>,
  ) { }

  ngOnInit() {
    this.getMessages();
    this.getFirst();
    this.getLast();

    this.store
      .select(getFeedbackAll)
      .subscribe(store => this.messages = store);
  }

  onDelete(id: string) {
    this.fireService.deleteMessageFromDb(id);
  }


  // get inirial messages
  getMessages(): void {
    this.store.dispatch(new QueryFeedbacksFromDb({ query: 'initialMessagesQuery' }));

    // this.fireService.getMessagesFromDb()
    //   .subscribe((messages: Feedback[]) => this.messages = messages);
  }

  getFirst(): void {
    this.fireService.getFirst()
      .subscribe((messages: QueryDocumentSnapshot<Feedback>) => this.firstInCollectionFeedback = messages);
  }

  getLast(): void {
    this.fireService.getLast()
      .subscribe((messages: QueryDocumentSnapshot<Feedback>) => this.lastInCollectionFeedback = messages);
  }

  nextPage(): void {
    this.store.dispatch(new QueryFeedbacksFromDb({ query: 'nextMessagesQuery' }));
    // this.fireService.nextPage()
    //   .subscribe((messages: Feedback[]) => {
    //     if (!messages.length) {
    //       return;
    //     }
    //     this.messages = messages;
    //   });
  }

  prevPage(): void {
    this.store.dispatch(new QueryFeedbacksFromDb({ query: 'prevMessagesQuery' }));
    // this.fireService.prevPage()
    //   .subscribe((messages: Feedback[]) => {
    //     if (!messages.length) {
    //       return;
    //     }
    //     this.messages = messages;
    //   });
  }

  navHome() {
    this.router.navigate(['/']);
  }

  googleSignin() {
    this.store.dispatch(new GoogleLogin());
  }

  signOut() {
    this.router.navigate(['/']);
    this.store.dispatch(new Logout());
  }
}
