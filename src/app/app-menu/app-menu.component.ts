import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from '../character';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.sass'],
})
export class AppMenuComponent {
  @Input() editMode!: boolean;
  @Input() character!: Character
  @Output() editModeChange = new EventEmitter<boolean>();
}
