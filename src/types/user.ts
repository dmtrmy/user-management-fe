// src/types/user.ts

export interface UserContextData {
    name: string;
    email: string;
    provider?: 'email' | 'google';
  }
  
  export interface UserMetadata {
    full_name?: string;
    name?: string;
    display_name?: string;
  }