import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed: boolean;

  constructor() {
    this.isCollapsed = true;
  }

  ngOnInit() {
  }

  navbarCollapse() {
    this.isCollapsed = !this.isCollapsed
  }

}
