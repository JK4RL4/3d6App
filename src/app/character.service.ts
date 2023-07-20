import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Character } from './character.type';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  currentCharacter!: Character;
  character = new Subject<Character>();
  currentPrintCharacter!: any;
  printCharacter = new Subject<any>();
  currentActionCompleted!: string;
  actionCompleted = new Subject<string>();

  constructor() {}

  // Personaje
  getCharacter(): Observable<Character> {
    return this.character.asObservable();
  }

  getCurrentCharacter(): Character {
    return this.currentCharacter;
  }

  sendCharacter(character: Character): void {
    this.currentCharacter = character;
    this.character.next(character);
  }

  clearCharacter(): void {
    this.character.next(new Character());
  }

  // Acción de carga
  getActionCompleted(): Observable<string> {
    return this.actionCompleted.asObservable();
  }

  sendActionCompleted(action: string): void {
    this.actionCompleted.next(action);
  }

  getCurrentActionCompleted(): string {
    return this.currentActionCompleted;
  }

  clearActionCompleted(): void {
    this.actionCompleted.next('');
    this.currentActionCompleted = '';
  }

  // Personaje para imprimir
  getPrintCharacter(): Observable<any> {
    return this.printCharacter.asObservable();
  }

  getCurrentPrintCharacter(): any {
    return this.currentPrintCharacter;
  }

  sendPrintCharacter(printCharacter: any): void {
    this.currentPrintCharacter = printCharacter;
    this.printCharacter.next(printCharacter);
  }

  clearPrintCharacter(): void {
    this.printCharacter.next(null);
  }
}
