import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCartComponent } from './transaction-cart.component';

describe('TransactionCartComponent', () => {
  let component: TransactionCartComponent;
  let fixture: ComponentFixture<TransactionCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionCartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
