import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceListComponent } from './interface-list.component';

describe('InterfaceListComponent', () => {
  let component: InterfaceListComponent;
  let fixture: ComponentFixture<InterfaceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
