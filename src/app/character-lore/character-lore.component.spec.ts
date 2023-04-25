import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLoreComponent } from './character-lore.component';

describe('CharacterLoreComponent', () => {
  let component: CharacterLoreComponent;
  let fixture: ComponentFixture<CharacterLoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterLoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterLoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
