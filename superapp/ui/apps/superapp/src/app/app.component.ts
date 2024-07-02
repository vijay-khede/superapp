import { Component, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@enttribe/core/tools/snackbar';
import { DOCUMENT } from '@angular/common';
import { ConnectionService } from 'ng-connection-service';
import { NavigationService, CoreUtilService } from '@enttribe/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'superapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'superapp';
  private ratio = '1';
  public isMicroApp = false;
  constructor(
    private router: Router,
    private connectionService: ConnectionService,
    private snackbarService: SnackbarService,
    @Inject(DOCUMENT) private document: Document,
    private window: Window,
    private navigationService: NavigationService,
    private coreUtils: CoreUtilService
  ) {
    if (environment.name === 'micro-app' || environment.name === 'mtest') {
      this.isMicroApp = true;
    } else {
      this.router.initialNavigation();
      this.navigationService.initNavigation();
      this.connectionService.monitor().subscribe((isConnected) => {
        if (!isConnected) {
          this.snackbarService.error(
            'You are offline, Please check your connection'
          );
        } else {
          this.snackbarService.success('You are online');
        }
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    if (environment.name !== 'micro-app' && environment.name !== 'mtest') {
      this.refreshGrid();
    }
  }

  ngOnInit(): void {
    if (environment.name !== 'micro-app' && environment.name !== 'mtest') {
      this.refreshGrid();
    }
  }

  getFontSize(): string {
    const fontSize = Number((this.window.innerWidth / 120).toFixed(2));
    const fontSizeValue: string =
      fontSize > 16 ? '16' : fontSize < 10 ? '10' : fontSize.toString();
    return fontSizeValue;
  }

  getRowHeight(): {
    GridRowHeight: string;
    GridHeaderHeight: string;
    FontRatio: string;
    BodyFont: string;
  } {
    const body = this.document.querySelector('body');
    const fontSize = this.getFontSize();
    body.style.fontSize = fontSize + 'px';
    this.ratio = (Number(fontSize) / 13).toFixed(2);
    return {
      GridRowHeight: (Number(this.ratio) * 56).toFixed(0),
      GridHeaderHeight: (Number(this.ratio) * 48).toFixed(0),
      FontRatio: this.ratio,
      BodyFont: fontSize + 'px',
    };
  }
  refreshGrid(): void {
    const gridHeights = this.getRowHeight();
    this.window['GridRowHeight'] = gridHeights.GridRowHeight;
    this.window['GridHeaderHeight'] = gridHeights.GridHeaderHeight;
    this.window['FontRatio'] = gridHeights.FontRatio;
    this.window['BodyFont'] = gridHeights.BodyFont;
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    if (environment.name !== 'micro-app' && environment.name !== 'mtest') {
      this.coreUtils.updatedUrl();
    }
  }
}
