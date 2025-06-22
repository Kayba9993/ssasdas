
export interface Professor {
  id: string;
  name: string;
  title: string;
  language: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
}

export interface Language {
  id: string;
  name: string;
  nativeName: string;
  flag?: string;
}

export interface Course {
  id: string;
  title: string;
  language: string;
  level: string;
  description: string;
  price: number;
}

export interface RegistrationFormData {
  fullName: string;
  age: string;
  email: string;
  phone: string;
  level: string;
  language: string;
  classType: string;
}

