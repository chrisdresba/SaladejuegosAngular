import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegopropioComponent } from './juegopropio.component';

describe('JuegopropioComponent', () => {
  let component: JuegopropioComponent;
  let fixture: ComponentFixture<JuegopropioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegopropioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegopropioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
