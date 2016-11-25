import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Hero }           from './hero';

@Injectable()
export class HeroSearchService{
  private heroesUrl = 'app/heroes';

  constructor(private http: Http){}

  public search(term: string): Observable<Hero[]>{
    const url = `${this.heroesUrl}?name=${term}`;
    return this.http
      .get(url)
      .map((r: Response) => r.json().data as Hero[]);
  }
}
