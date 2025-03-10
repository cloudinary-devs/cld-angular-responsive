import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'cld-angular-responsive';
  imagePath!: string;
  baseURL =
    'https://res.cloudinary.com/tamas-demo/image/upload/breakpoints-article/tuscany.jpg';
  breakpoint!: string; // Stores the current breakpoint name

  cloudinaryTransformations = {
    [Breakpoints.XSmall]: 'c_fill,w_200,h_150,f_auto,q_auto',
    [Breakpoints.Small]: 'c_fill,w_400,h_300,f_auto,q_auto',
    [Breakpoints.Medium]: 'c_fill,w_600,h_450,f_auto,q_auto',
    [Breakpoints.Large]: 'c_fill,w_800,h_600,f_auto,q_auto',
    [Breakpoints.XLarge]: 'c_fill,w_1200,h_900,f_auto,q_auto',
  };

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(Object.keys(this.cloudinaryTransformations))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.breakpoint = query; // Store current breakpoint name
            this.imagePath = this.getCloudinaryURL(
              this.cloudinaryTransformations[query]
            );
            break;
          }
        }
      });
  }

  getCloudinaryURL(transformation: string): string {
    const urlParts = this.baseURL.split('/');
    const uploadIndex = urlParts.indexOf('upload');
    urlParts.splice(uploadIndex + 1, 0, transformation);
    return urlParts.join('/');
  }
}

