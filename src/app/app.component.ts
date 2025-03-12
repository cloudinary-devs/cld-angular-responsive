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
    'https://res.cloudinary.com/demo/image/upload/docs/guitar-man.jpg';
  breakpoint!: string; // Stores the current breakpoint name

  cloudinaryTransformations = {
    [Breakpoints.XSmall]: 'ar_1:1,c_thumb,g_face,w_150/f_auto/q_auto',
    [Breakpoints.Small]: 'ar_1:1,c_thumb,g_face,w_400/f_auto/q_auto',
    [Breakpoints.Medium]: 'c_scale,w_600/f_auto/q_auto',
    [Breakpoints.Large]: 'ar_2:1,c_auto,g_auto,w_800/f_auto/q_auto',
    [Breakpoints.XLarge]: 'ar_2:1,c_auto,g_auto,w_1200/f_auto/q_auto',
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

