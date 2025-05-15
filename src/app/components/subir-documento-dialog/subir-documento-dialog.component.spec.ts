import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirDocumentoDialogComponent } from './subir-documento-dialog.component';

describe('SubirDocumentoDialogComponent', () => {
  let component: SubirDocumentoDialogComponent;
  let fixture: ComponentFixture<SubirDocumentoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubirDocumentoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubirDocumentoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
