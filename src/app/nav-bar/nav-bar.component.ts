import { Component, OnInit, ElementRef } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.sass'],
  host: {'(document:click)': 'closeDropdown($event)'}
})
export class NavBarComponent implements OnInit {

  constructor(protected appService: AppService,
              private eref: ElementRef) { }
  isOpen = true;

  ngOnInit() {
  }

  closeDropdown(event) {
    if (!this.eref.nativeElement.contains(event.target)) {
    this.isOpen = true;
    }
  }
  onDropdownToggle() {
    this.isOpen = !this.isOpen;
}
}
