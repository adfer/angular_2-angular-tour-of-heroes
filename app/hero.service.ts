import {Injectable} from "@angular/core";
import {Headers, Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {Hero} from "./hero";

@Injectable()
export class HeroService{

  private headers = new Headers({'Content-Type': 'application/json'});

  private heroesUrl = 'app/heroes';

  constructor(private http: Http){}

  public create(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  public update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), {headers: this.headers})
      .toPromise()
      .then(() => hero)
      .catch(this.handleError);
  }

  public delete(heroId: number): Promise<void> {
    const url = `${this.heroesUrl}/${heroId}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
               .then(heroes => heroes.find(hero => hero.id === id));
  }

  getHeroes(): Promise<Hero[]> {
    return this.getHeroesFromWebService();
  }

  private getHeroesFromWebService(): Promise<Hero[]>{
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
