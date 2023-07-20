import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, Observable, Observer } from 'rxjs';
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
export class PrintComponent implements OnInit {
  readonly ATTRIBUTES = ATTRIBUTES;
  readonly SKILLS = SKILLS;
  printCharacterSub!: Subscription;
  printCharacter: any;
  characterImage: any;
  printed!: boolean;
  parseInt = parseInt;
  String = String;

  constructor(
    private characterService: CharacterService,
    public dialogRef: MatDialogRef<PrintComponent> // private httpClient: HttpClient, // private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.printCharacter = this.characterService.getCurrentPrintCharacter();

    this.getBase64ImageFromURL(this.printCharacter.character.image).subscribe(
      (characterImage: any) => {
        // this is the image as dataUrl
        this.characterImage = 'data:image/jpg;base64,' + characterImage;
      }
    );
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

  print(): void {
    this.printed = true;
    setTimeout(() => this.printCharacterSheet(), 0);
  }

  printCharacterSheet(): void {
    const self = this;
    html2canvas(document.getElementById('char-print-container')!, {
      // allowTaint: true,
      useCORS: true,
    }).then(function (canvas) {
      canvas?.toBlob((blob: any) => {
        saveAs(blob, self.printCharacter.character.name + '.png');
      });
      self.dialogRef.close();
    });
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      // create an image object
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        // This will call another method that will create image from url
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    // We create a HTML canvas object that will create a 2d image
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    // This will draw image
    ctx?.drawImage(img, 0, 0);
    // Convert the drawn image to Data URL
    let dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }
}
