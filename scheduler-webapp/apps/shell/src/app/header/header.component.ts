import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'rennic-commons-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() isMobile!: boolean;
  @Input() isSidenavOpened!: boolean;

  @Output() isSidenavOpenedChange = new EventEmitter<boolean>();

  constructor(private readonly location: Location) {}

  toggleSidenav(): void {
    this.isSidenavOpenedChange.emit(!this.isSidenavOpened);
  }

  onClickBack(): void {
    this.location.back();
  }
}
