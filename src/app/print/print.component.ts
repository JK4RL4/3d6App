import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { CharacterService } from '../character.service';
import { ATTRIBUTES } from '../character.const';
import { SKILLS } from '../character.const';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.sass'],
})
export class PrintComponent implements OnInit, AfterViewInit {
  readonly ATTRIBUTES = ATTRIBUTES;
  readonly SKILLS = SKILLS;
  printCharacterSub!: Subscription;
  printCharacter: any;
  characterImage: any;
  parseInt = parseInt;
  String = String;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<PrintComponent>,
    // private httpClient: HttpClient,
    // private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.printCharacter = this.characterService.getCurrentPrintCharacter();
    // this.getBase64ImageFromUrl(this.printCharacter.character.image).then(
    //   (result) => {
    //     this.characterImage = result;
    //     console.log(result);
    //   }
    // );
    // this.getImage(this.printCharacter.character.image).subscribe(img => console.log(img))
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.printCharacterSheet(), 0);
  }

  getSkill(skill: string): number | null {
    let skillFound = this.printCharacter.parsedSkills.find(
      (parsedSkill: any) => parsedSkill.name == skill
    );
    if (skillFound) {
      return this.parseInt(String(skillFound.rank)) + 8;
    }
    return null;
  }

  printCharacterSheet(): void {
    const self = this;
    html2canvas(document.getElementById('char-print-container')!, {
      allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      canvas?.toBlob((blob: any) => {
        saveAs(blob, self.printCharacter.character.name + '.png');
      });
      self.dialogRef.close();
    });
  }

  // async getBase64ImageFromUrl(imageUrl: string) {
  //   let res = await fetch(imageUrl);
  //   let blob = await res.blob();

  //   return new Promise((resolve, reject) => {
  //     var reader = new FileReader();
  //     reader.addEventListener(
  //       'load',
  //       function () {
  //         resolve(reader.result);
  //       },
  //       false
  //     );

  //     reader.onerror = () => {
  //       return reject(this);
  //     };
  //     reader.readAsDataURL(blob);
  //   });
  // }

  // getImage(imageUrl: string): Observable<Blob> {
  //   return this.httpClient.get(imageUrl, { responseType: 'blob' });
  // }
}
