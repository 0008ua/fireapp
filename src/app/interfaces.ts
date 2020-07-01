import { DocumentSnapshot } from '@angular/fire/firestore';

export interface IChatMsg {
  message: string;
  isOutgoing?: boolean;
  payload?: any;
  room?: string;
}

export interface IUser {
  uid: string | null;
  email?: string;
  photoURL?: string;
  displayName: string;
  myCustomData?: string;
  emailVerified?: boolean;
  loading?: boolean;
  error?: string;
}

export class User implements IUser {
  constructor(
    public uid: string | null,
    public displayName: string,
    public photoURL?: string,
    ) { }
}

export interface Feedback {
  id: string;
  message: string;
  contacts: string;
  name: string;
  createdAt?: any;
  markAsReaded?: boolean;
  createdBy?: any;
  error?: string;
}

export interface FeedbackQuery {
  first: DocumentSnapshot<Feedback>;
  last: DocumentSnapshot<Feedback>;
}

