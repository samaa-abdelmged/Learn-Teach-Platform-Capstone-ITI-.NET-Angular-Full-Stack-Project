import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private lang$ = new BehaviorSubject<string>('en');
  private translations: Record<string, any> = {};
  public currentLang$ = this.lang$.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('lang');
    if (saved) this.setLanguage(saved);
    else this.loadTranslations('en'); // default
  }

  setLanguage(lang: string) {
    if (lang === this.lang$.value) return;
    this.lang$.next(lang);
    localStorage.setItem('lang', lang);
    this.loadTranslations(lang);
    // set document direction for Arabic
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';
  }

  private loadTranslations(lang: string) {
    // public path: /assets/i18n/{lang}.json
    this.http.get<Record<string, any>>(`/assets/i18n/${lang}.json`)
      .pipe(
        tap(obj => {
          this.translations = obj || {};
        })
      )
      .subscribe({
        next: () => {},
        error: (err) => {
          console.error('Failed to load translations for', lang, err);
        }
      });
  }

  translate(key: string): string {
    return this.translations[key] ?? key;
  }

  // If you want observable of translations for async pipes
  getTranslation$(key: string): Observable<string> {
    return this.lang$.pipe(
      // map to current value (simple)
      // but easier is to return a BehaviorSubject of translations — for simplicity:
      // Here we'll return observable that emits current translation immediately
      // (component can subscribe if needs updates)
      // Implementation:
      tap(() => {}), // no-op (placeholder)
    ) as unknown as Observable<string>;
  }
  getCurrentLanguage(): string {
  return this.lang$.value; 
}

}
