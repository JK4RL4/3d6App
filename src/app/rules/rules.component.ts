import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material/dialog';
import { RULES } from './rules';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.sass'],
})
export class RulesComponent implements OnInit {
  rules = JSON.parse(JSON.stringify(RULES));
  sanitazedRules: any = {};
  rulesIndexes: string[] = Object.keys(RULES).sort((a, b) =>
    a.localeCompare(b)
  );
  ruleSelected: string = '';

  constructor(
    public dialogRef: MatDialogRef<RulesComponent>,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    for (let rule in this.rules) {
      this.rulesIndexes.forEach((ruleIndex) => {
        if (this.rules[rule].includes(ruleIndex)) {
          this.rules[rule] = this.rules[rule].replace(
            ruleIndex,
            `<span id='` +
              ruleIndex +
              `' class='rule-link'>` +
              ruleIndex +
              `</span>`
          );
        }
        this.sanitazedRules[rule] = this.sanitizer.bypassSecurityTrustHtml(
          this.rules[rule]
        );
      });
    }
  }

  ruleClick(e: MouseEvent): void {
    let rule = e.target as HTMLButtonElement;
    this.ruleSelected = rule.id;
  }
}
