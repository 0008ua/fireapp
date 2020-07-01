import { Component, OnInit, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { AppearedOnScreenNavigations } from 'src/app/actions/navigation.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  // TODO move to HomeComponent
  // mark section for scrolling to it
  @ViewChildren('scrollerMarker') scrollerMarker: QueryList<any>;

  private prevElOnScreen: string;

  constructor(
    private eventsService: EventsService,
    private translate: TranslateService,
    private store: Store<State>,
  ) { }

  ngAfterViewInit() {
    this.store
      .select('navigation')
      .subscribe(store => {
        const elementId = store.moveToSection;
        if (this.scrollerMarker) {
          this.scrollerMarker.forEach(el => {
            if (el.nativeElement.id === elementId) {
              el.nativeElement.scrollIntoView({ behavior: 'smooth' });
            }
          });
        }
      });

    // this.store
    //   .select(state => state.headerPage)
    //   .subscribe(store => {
    //     const elementId = store.elementId;
    //     console.log('subscr on menu');


    //     if (this.scrollerMarker) {
    //       this.scrollerMarker.forEach(el => {
    //         if (el.nativeElement.id === elementId) {
    //           console.log('this.scrollerMarker', el);
    //           el.nativeElement.scrollIntoView({ behavior: 'smooth' });
    //         }
    //       });
    //     }
    //   });
  }

  ngOnInit() {
    // TODO move to HomeComponent
    // event, emitted by menu
    // scroll to element by id



    // this.eventsService.onScrollTo()
    //   .subscribe(elementId => {
    //     if (this.scrollerMarker) {
    //       this.scrollerMarker.forEach(el => {
    //         if (el.nativeElement.id === elementId) {
    //           el.nativeElement.scrollIntoView({ behavior: 'smooth' });
    //         }
    //       });
    //     }

    //   });
  }

  // TODO move to HomeComponent
  // listening for directive event of current on screen block
  // header menu subscribed on this obs to set 'active' item
  onElementOnScreen(elementId: string) {
    // if (this.prevElOnScreen !== elementId) {
    //   console.log('elementId', elementId);
    //   this.prevElOnScreen = elementId;

    //   this.store.dispatch(new AppearedOnScreenNavigations(elementId));
    // }

    this.eventsService.elementOnScreen$.next(elementId);
  }

}
