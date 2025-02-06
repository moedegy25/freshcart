import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerfiyresetcodeComponent } from './verfiyresetcode.component';

describe('VerfiyresetcodeComponent', () => {
  let component: VerfiyresetcodeComponent;
  let fixture: ComponentFixture<VerfiyresetcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerfiyresetcodeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerfiyresetcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
