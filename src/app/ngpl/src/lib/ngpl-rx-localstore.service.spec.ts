import {NgplRxLocalstoreService} from './ngpl-rx-localstore.service';
import {tap} from 'rxjs/operators';

describe('NgplRxLocalStoreService', () => {
  let service: NgplRxLocalstoreService;
  let key;
  let value;
  beforeEach(() => {
    key = 'key_test';
    value = {a: 'A Value', b: 'B Value'};
    service = new NgplRxLocalstoreService();
  });

  afterEach(() => {
    service.clear();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null', () => {
    expect(service.getItem(key)).toEqual(null);
  });

  it('should return current value', () => {
    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);
  });

  it('should emit value changes', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
        })
      )
      .subscribe();
    service.setItem(key, value);
    expect(service.getItem(key)).toEqual(value);

    service.valueChanges(key + '1')
      .pipe(
        tap((val: any) => {
          expect(val).toEqual(value);
          done();
        })
      )
      .subscribe();
    service.setItem(key + '1', value);

  });


  it('should emit null when delete item', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toBeFalsy();
          done();
        })
      )
      .subscribe();
    service.removeItem(key);
  });

  it('should emit null when delete item', done => {
    service.valueChanges(key)
      .pipe(
        tap((val: any) => {
          expect(val).toBeFalsy();
          done();
        })
      )
      .subscribe();
    service.removeItem(key);
  });

  it('should persist null value ', () => {
    service.setItem('null', null);
    expect(service.getItem('null')).toBeFalsy();
  });

  it('should return number of item persisted ', () => {
    service.setItem('item1', null);
    service.setItem('item2', null);
    service.setItem('item3', null);
    expect(service.length()).toEqual(3);
    service.removeItem('item2');
    expect(service.length()).toEqual(2);
    service.clear();
    expect(service.length()).toEqual(0);
  });


  it('should remove each item using key index', () => {
    service.setItem('item1', 0);
    service.setItem('item2', 1);
    service.setItem('item3', 2);

    const length = service.length();
    expect(length).toEqual(3);
    expect(service.getItem(service.key(0))).toEqual(0);
    expect(service.getItem(service.key(1))).toEqual(1);
    expect(service.getItem(service.key(2))).toEqual(2);

    service.removeItem(service.key(0));
    expect(service.length()).toEqual(2);

    service.removeItem(service.key(0));
    expect(service.length()).toEqual(1);

    service.removeItem(service.key(0));
    expect(service.length()).toEqual(0);

  });


  it('should emit null when clear localStore', done => {
    service.setItem('item1', 0);
    service.setItem('item2', 1);
    service.setItem('item3', 2);

    service.valueChanges('item2')
      .pipe(
        tap((val: any) => {
          expect(val).toBeFalsy();
          done();
        })
      )
      .subscribe();
    service.clear();
  });

});
