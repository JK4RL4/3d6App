import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Character, EMPTY_CHARACTER } from './character';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  currentCharacter!: Character;
  characterUpdate = new Subject<Character>();

  actionCompleted = new Subject<string>();

  constructor() {}

  getCharacterUpdates(): Observable<Character> {
    return this.characterUpdate.asObservable();
  }

  getCurrentCharacter(): Character {
    return this.currentCharacter;
  }

  sendCharacterUpdates(character: Character): void {
    this.characterUpdate.next(character);
    this.currentCharacter = character;
  }

  clearCharacterUpdates(): void {
    this.characterUpdate.next(JSON.parse(JSON.stringify(EMPTY_CHARACTER)));
    this.currentCharacter = JSON.parse(JSON.stringify(EMPTY_CHARACTER));
  }

  getActionCompleted(): Observable<string> {
    return this.actionCompleted.asObservable();
  }

  sendActionCompleted(action: string): void {
    this.actionCompleted.next(action);
  }
}
