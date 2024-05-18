import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8081';

  private userIdSource = new BehaviorSubject<number | null>(null);
  userId = this.userIdSource.asObservable();
  private userFirstNameSource = new BehaviorSubject<string | null>(null);
  userFirstName = this.userFirstNameSource.asObservable();

  setUserId(id: number): void {
    this.userIdSource.next(id);
    // this.fetchUserFirstName(id);
  }

  setUserFirstName(firstName: string): void {
    this.userFirstNameSource.next(firstName);
  }

  clearUserId(): void {
    this.userIdSource.next(null);
    this.userFirstNameSource.next(null);
  }

  login(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = Number(urlParams.get('userId'));
    const userFirstName = String(urlParams.get('userFirstName'));
    this.setUserId(userId);
    this.setUserFirstName(userFirstName);
  }

  logout(): void {
    this.clearUserId(); // Reset userId and userFirstName on logout
  }

  // private async fetchUserFirstName(userId: number): Promise<void> {
  //   try {
  //     const response = await fetch(`http://localhost:8081/users/${userId}`);
  //     const data = await response.json();
  //     this.userFirstNameSource.next(data.firstName);
  //   } catch (error) {
  //     console.error('Failed to fetch user first name', error);
  //     this.userFirstNameSource.next(null);
  //   }
  // }

  async fetchAllUsers(): Promise<{ id: number, firstName: string }[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch users:', error);
      return [];
    }
  }
}

