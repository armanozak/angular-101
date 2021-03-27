import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcon('twitter');
    this.registerIcon('github');
  }

  private registerIcon(name: string): void {
    const source = this.sanitizer.bypassSecurityTrustResourceUrl(
      `/assets/icons/${name}.svg`
    );
    this.iconRegistry.addSvgIcon(name, source);
  }
}
