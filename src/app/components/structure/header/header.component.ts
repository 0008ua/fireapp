import { Component, OnInit, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { config } from 'src/app/app-config';
import { IUser } from 'src/app/interfaces';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { EventsService } from 'src/app/services/events.service';
import { tap, filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { MoveToNavigations } from 'src/app/actions/navigation.actions';
import { GoogleLogin, Logout } from 'src/app/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  config = config;
  elementOnScreen: string;
  sections = config.sections;
  isAsidePopup = false;
  asideButtonClass = 'fa-angle-right';
  show = true;
  effect = 'fadeIn';
  language = 'en';
  user: IUser;
  public url = '/';

  constructor(
    private translate: TranslateService,
    public fireService: FireService,
    private router: Router,
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private store: Store<State>,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngAfterViewInit() {
    // this.markedSection.forEach(el => {
    // console.log('this.divs', el.nativeElement.id);
    // });
  }

  ngOnInit() {

    this.router.events.pipe(
      filter(nav => nav instanceof NavigationStart)
    )
      .subscribe((nav: NavigationStart) => this.url = nav.url);

    this.store.select('user').subscribe((store) => this.user = store.user);
    // this.fireService.user$.subscribe((user) => this.user = user);

    // event, emiitted by directive -> component
    // when element appeared on screen
    // this.store
    //   .select('navigation')
    //   .subscribe(store => this.elementOnScreen = store.appearedSection);
    this.eventsService.onElementOnScreen()
      .subscribe(elementOnScreen => this.elementOnScreen = elementOnScreen);
  }

  navTo(url: string) {
    this.router.navigate([url]);
  }

  switchLanguage(event?) {
    if (event) {
      event.stopPropagation();
    }
    if (this.language === 'en') {
      this.translate.use('fr');
      this.language = 'fr';
    } else {
      this.translate.use('en');
      this.language = 'en';
    }
  }

  setEffect(event) {
    this.effect = event;
  }

  // scrolling to element after menu click
  scrollTo(elementId: string) {
    this.store.dispatch(new MoveToNavigations(elementId));

    // this.store.dispatch(new ScrollTo({ elementId }));
    // this.eventsService.scrollTo$.next(elementId);
  }

  switchPopup() {
    this.isAsidePopup = !this.isAsidePopup;
    this.asideButtonClass = this.isAsidePopup ? 'fa-angle-left' : 'fa-angle-right';
  }

  showPopup(visible) {
    this.isAsidePopup = visible;
    this.asideButtonClass = this.isAsidePopup ? 'fa-angle-left' : 'fa-angle-right';
  }

  googleSignin() {
    this.store.dispatch(new GoogleLogin());
  }

  signOut() {
    this.router.navigate(['/']);
    this.store.dispatch(new Logout());
  }
}


