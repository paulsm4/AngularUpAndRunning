import { TestBed } from '@angular/core/testing';

import { StockLoadResolverService } from './stock-load-resolver.service';

describe('StockLoadResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockLoadResolverService = TestBed.get(StockLoadResolverService);
    expect(service).toBeTruthy();
  });
});
