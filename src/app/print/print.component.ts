import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { CharacterService } from '../character.service';
import { ATTRIBUTES,ATTRIBUTES_IMG } from '../character.const';
import { SKILLS } from '../character.const';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.sass'],
})
export class PrintComponent implements OnInit {
  readonly ATTRIBUTES = ATTRIBUTES;
  readonly ATTRIBUTES_IMG = ATTRIBUTES_IMG;
  readonly SKILLS = SKILLS;
  printCharacterSub!: Subscription;
  printCharacter: any;
  printed!: boolean;
  parseInt = parseInt;
  String = String;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<PrintComponent>
  ) {}

  ngOnInit(): void {
    this.printCharacter = this.characterService.getCurrentPrintCharacter();
  }

  getSkill(skill: string): number | string | null {
    let skillFound = this.printCharacter.parsedSkills.find(
      (parsedSkill: any) => parsedSkill.name == skill
    );
    if (skillFound) {
      return this.parseInt(String(skillFound.rank)) + 8;
    } else {
      return '__';
    }
  }

  print(): void {
    this.printed = true;
    setTimeout(() => this.printCharacterSheet(), 0);
  }

  printCharacterSheet(): void {
    const self = this;
    html2canvas(document.getElementById('char-print-container')!, {
      scale: 4,
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      canvas?.toBlob((blob: any) => {
        saveAs(blob, self.printCharacter.character.name + '.png');
      });
      self.dialogRef.close();
    });
  }
}
