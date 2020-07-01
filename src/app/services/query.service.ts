import { Injectable } from '@angular/core';
import { CollectionReference, QueryFn } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor() { }

  getQuery(query: string, params?: any): QueryFn {
    console.log('params', params);
    return this[query](params);
  }

  initialMessagesQuery(): QueryFn {
    return (ref: CollectionReference) => {
      return ref
        .orderBy('createdAt', 'desc')
        .limit(2);
    };
  }

  prevMessagesQuery(params: any): QueryFn {
    const { first } = params;
    return (ref: CollectionReference) => {
      return ref
        .orderBy('createdAt', 'desc')
        .endBefore(first)
        .limitToLast(2);
    };
  }


  nextMessagesQuery(params: any): QueryFn {
    const { last } = params;
    console.log('last', last);
    return (ref: CollectionReference) => {
      return ref
        .orderBy('createdAt', 'desc')
        .startAfter(last)
        .limit(2);
    };
  }
}
