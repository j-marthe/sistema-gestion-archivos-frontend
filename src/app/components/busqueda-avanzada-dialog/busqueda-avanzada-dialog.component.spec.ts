import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusquedaAvanzadaDialogComponent } from './busqueda-avanzada-dialog.component';

describe('BusquedaAvanzadaDialogComponent', () => {
  let component: BusquedaAvanzadaDialogComponent;
  let fixture: ComponentFixture<BusquedaAvanzadaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusquedaAvanzadaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusquedaAvanzadaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
