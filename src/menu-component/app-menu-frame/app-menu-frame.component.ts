import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-frame',
  inputs: [
    'element: ui-element',
    'closed: ui-closed',
    'flat: ui-flat',
    'x: ui-x',
    'y: ui-y'
  ],
  template: require('./app-menu-frame.component.html'),
  styles: [require('./app-menu-frame.component.scss')]
})

export class AppMenuFrameComponent {
  element: string = 'popup';
  closed: boolean = false;
  x: string = '0';
  y: string = '0';
  flat: boolean = false;

  private top: string;
  private left: string;

  private draggable: boolean;

  constructor(private myElement: ElementRef) { }

  ngOnAfterViewInit() {
    this.fixPosition();
  }

  ngOnChanges() {
    switch (this.element) {
      case 'popup':
        this.draggable = true;
        this.fixPosition();
        break;
      default:
        this.draggable = false;
        break;
    }
  }

  setPosition(x: number, y: number) {
    this.x = x.toString();
    this.y = y.toString();
    this.fixPosition();
  }

  private fixPosition() {
    let x = parseInt(this.x),
      w = window.innerWidth,
      y = parseInt(this.y),
      h = window.innerHeight;

    if (x >= w * 0.6) {
      this.x = (w * 0.6).toString();
    }

    if (y >= h * 0.2) {
      this.y = (h * 0.2).toString();
    }

    this.applyPosition();
  }

  private applyPosition() {
    this.left = this.x + 'px';
    this.top = this.y + 'px';
  }
}
