import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RatingData {
  userId: string;
  userName: string;
  lessonId: string;
  lessonTitle: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface RatingStats {
  total: number;
  average: number;
}

@Injectable({ providedIn: 'root' })
export class RatingService {
  private http = inject(HttpClient);
  private apiUrl = '/api/ratings';

  submitRating(lessonId: string, lessonTitle: string, stars: number, comment: string): Observable<RatingData> {
    return this.http.post<RatingData>(this.apiUrl, { lessonId, lessonTitle, stars, comment });
  }

  getAllRatings(): Observable<RatingData[]> {
    return this.http.get<RatingData[]>(this.apiUrl);
  }

  getStats(): Observable<RatingStats> {
    return this.http.get<RatingStats>(`${this.apiUrl}/stats`);
  }
}
