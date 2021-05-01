import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  refreshPage() {
    this.document.defaultView.location.reload();
  }

  ngOnInit() {

    // if (sessionStorage.email && !this.isRefreshed) {
    //   this.isRefreshed = true;
    //   console.log(this.isRefreshed);
    //   window.location.reload();
    // }  

    // this.refreshPage();

  }

}
