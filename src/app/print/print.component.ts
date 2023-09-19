import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { CharacterService } from '../character.service';
import { ATTRIBUTES, ATTRIBUTES_IMG } from '../character.const';
import { SKILLS } from '../character.const';
import { Attributes, Skill } from '../character.type';

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
  printCharacterSkills!: any;
  parseInt = parseInt;
  String = String;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<PrintComponent>
  ) {}

  ngOnInit(): void {
    this.printCharacter = this.characterService.getCurrentPrintCharacter();
    if (this.printCharacter) {
      this.printCharacterSkills = this.SKILLS.map((skill) => {
        let skillFound = this.printCharacter.parsedSkills.find(
          (parsedSkill: any) => parsedSkill.name == skill.name
        );
        if (skillFound) {
          return {
            name: skill.name,
            attribute: skill.attribute,
            type: skill.type,
            competence: true,
            rank: this.parseInt(String(skillFound.rank)) + 8,
          };
        } else {
          return {
            name: skill.name,
            attribute: skill.attribute,
            type: skill.type,
            competence: false,
            rank:
              skill.type == 'c'
                ? "-"
                : 10 +
                  this.parseInt(
                    this.printCharacter.character.attributes[skill.attribute]
                  ) -
                  (skill.type == 'i' ? 2 : skill.type == 't' ? 4 : 0),
          };
        }
      });
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
