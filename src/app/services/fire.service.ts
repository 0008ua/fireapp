import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, Feedback } from '../interfaces';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore, AngularFirestoreDocument,
  AngularFirestoreCollection, QueryDocumentSnapshot,
  DocumentSnapshot, DocumentChange, DocumentChangeAction, QueryFn, CollectionReference
} from '@angular/fire/firestore';

import { Observable, of, combineLatest, ReplaySubject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { QueryService } from './query.service';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  user$: Observable<IUser>;
  first: QueryDocumentSnapshot<Feedback> = null;
  last: QueryDocumentSnapshot<Feedback> = null;
  user: IUser;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private queryService: QueryService,
  ) {
    
    // this.user$ = this.afAuth.authState.pipe(
    //   switchMap(user => {
    //     this.user = user;
    //     // Logged in
    //     if (user) {
    //       return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
    //     } else {
    //       // Logged out
    //       return of(null);
    //     }
    //   })
    // );
  }

  googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  // async googleSignin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   const credential = await this.afAuth.auth.signInWithPopup(provider);
  //   return this.updateUserData(credential.user);
  // }


  deleteMessageFromDb(id: string) {
    const colRef: AngularFirestoreCollection<Feedback> = this.afs.collection(`feedbacks`);
    const docRef: AngularFirestoreDocument<Feedback> = colRef.doc(id);
    docRef.delete();
  }

  saveMessageToDb(message: Feedback) {
    // TODO: move to server side
    message.createdAt = new Date();
    message.markAsReaded = false;
    message.createdBy = this.user ? this.user.uid : null;

    const colRef: AngularFirestoreCollection<Feedback> = this.afs.collection(`feedbacks`);
    of(colRef.add(message))
      .subscribe(x => console.log('res', x));
  }

  getFeedbackAction(query: string): Observable<any> {
    const itemsCollection: AngularFirestoreCollection<Feedback> = this.afs.collection<Feedback>('feedbacks',
      this.queryService.getQuery(
        query,
        {
          first: this.first,
          last: this.last
        }
      )
    );
    return itemsCollection
      .snapshotChanges()
      .pipe(map((snapshot) => {
        if (snapshot[0]) {
          this.first = snapshot[0].payload.doc;
          this.last = snapshot[snapshot.length - 1].payload.doc;
        } else {
          this.first = null;
        }
        return snapshot;
      }));
    // .pipe(
    //   map((snapshot) => {
    //     if (snapshot[0]) {
    //       this.last = snapshot[snapshot.length - 1].payload.doc;
    //       return snapshot.map(documentChangeAction => {
    //         return {
    //           id: documentChangeAction.payload.doc.id,
    //           ...documentChangeAction.payload.doc.data(),
    //         } as Feedback;
    //       });
    //     } else {
    //       return null;
    //     }
    //   })
    // );
  }

  // getMessagesFromDb(): Observable<Feedback[]> {
  //   const itemsCollection: AngularFirestoreCollection<Feedback> = this.afs.collection<Feedback>('feedbacks',
  //     ref => ref
  //       .orderBy('createdAt', 'desc')
  //       .limit(2)
  //   );
  //   return itemsCollection
  //     .snapshotChanges()
  //     .pipe(
  //       map((snapshot) => {
  //         if (snapshot[0]) {
  //           this.last = snapshot[snapshot.length - 1].payload.doc;
  //           return snapshot.map(documentChangeAction => {
  //             return {
  //               id: documentChangeAction.payload.doc.id,
  //               ...documentChangeAction.payload.doc.data(),
  //             } as Feedback;
  //           });
  //         } else {
  //           return null;
  //         }
  //       })
  //     );
  // }

  getFirst(): Observable<QueryDocumentSnapshot<Feedback>> {
    return this.afs.collection<Feedback>('feedbacks',
      ref => ref
        .orderBy('createdAt', 'desc')
        .limit(1)
    )
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          if (snapshot[0]) {
            return snapshot[0].payload.doc;
          } else {
            return null;
          }
        })
      );
  }

  getLast(): Observable<QueryDocumentSnapshot<Feedback>> {
    return this.afs.collection<Feedback>('feedbacks',
      ref => ref
        .orderBy('createdAt', 'asc')
        .limit(1)
    )
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          if (snapshot[0]) {
            return snapshot[0].payload.doc;
          } else {
            return null;
          }
        })
      );
  }

  // prevPage(): Observable<Feedback[] | any[]> {
  //   const itemsCollection: AngularFirestoreCollection<Feedback> = this.afs.collection<Feedback>('feedbacks',
  //     ref => ref
  //       .orderBy('createdAt', 'desc')
  //       .endBefore(this.first)
  //       .limitToLast(2)
  //   );
  //   return itemsCollection
  //     .snapshotChanges()
  //     .pipe(
  //       map((snapshot) => {
  //         if (snapshot[0]) {
  //           this.first = snapshot[0].payload.doc;
  //           this.last = snapshot[snapshot.length - 1].payload.doc;
  //         } else {
  //           this.first = null;
  //           return [];
  //         }
  //         return snapshot.map(documentChangeAction => {
  //           return {
  //             id: documentChangeAction.payload.doc.id,
  //             ...documentChangeAction.payload.doc.data(),
  //           } as Feedback;
  //         });
  //       })
  //     );
  // }

  // nextPage(): Observable<Feedback[] | any[]> {
  //   const itemsCollection: AngularFirestoreCollection<Feedback> = this.afs.collection<Feedback>('feedbacks',
  //     ref => ref
  //       .orderBy('createdAt', 'desc')
  //       .startAfter(this.last)
  //       .limit(2)
  //   );
  //   return itemsCollection
  //     .snapshotChanges()
  //     .pipe(
  //       map((snapshot) => {
  //         if (snapshot[0]) {
  //           this.first = snapshot[0].payload.doc;
  //           this.last = snapshot[snapshot.length - 1].payload.doc;
  //         } else {
  //           this.last = null;
  //           return [];
  //         }
  //         return snapshot.map(documentChangeAction => {
  //           return {
  //             id: documentChangeAction.payload.doc.id,
  //             ...documentChangeAction.payload.doc.data(),
  //           } as Feedback;
  //         });
  //       })
  //     );
  // }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };
    return userRef.set(data, { merge: true });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }
}
