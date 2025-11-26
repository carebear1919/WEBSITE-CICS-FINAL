export interface NavItem {
  label: string;
  path: string;
}

export interface Achievement {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

export interface FacultyMember {
  name: string;
  position: string;
  expertise: string;
  image: string;
}

export interface Program {
  title: string;
  abbr: string;
  description: string;
}