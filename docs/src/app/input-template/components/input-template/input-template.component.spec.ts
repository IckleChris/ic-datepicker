import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTemplateComponent } from './input-template.component';

describe('InputTemplateComponent', () => {
  let component: InputTemplateComponent;
  let fixture: ComponentFixture<InputTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
