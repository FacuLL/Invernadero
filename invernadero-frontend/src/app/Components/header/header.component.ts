import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public href: String = ""
  public main: String = ""
  public config: String = ""
  public datos: String = ""

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          this.href = event.url;          
          if (this.href == "/") {
            this.main = "active"
            this.config = ""
            this.datos = ""
          }
          else if (this.href == "/configurar") {
            this.config = "active"
            this.main = ""
            this.datos = ""
          }
          else if (this.href == "/datos") {
            this.datos = "active"
            this.config = ""
            this.main = ""
          }
      }
  });
  }

  ngOnInit(): void {
    
  }

}
