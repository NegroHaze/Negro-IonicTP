import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';

describe('LoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginService = TestBed.get(LoginService);
    expect(service).toBeTruthy();
  });

  it('login', () => {
    const service: LoginService = TestBed.get(LoginService);
    const idTest = 'Bret';
    const nomReturned = 'Leanne Graham';
    service.login(idTest, 'replop')
        .subscribe(user => {
            expect(user.nom).toBe(nomReturned);
        });
});
});
