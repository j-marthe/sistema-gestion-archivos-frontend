import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarRolDialogComponent } from './cambiar-rol-dialog.component';

describe('CambiarRolDialogComponent', () => {
  let component: CambiarRolDialogComponent;
  let fixture: ComponentFixture<CambiarRolDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CambiarRolDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CambiarRolDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
