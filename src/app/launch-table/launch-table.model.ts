export interface Rocket {
  rocket_id: string;
  rocket_name: string;
}

export interface Links {
  presskit?: string;
}

export interface Launch {
  flight_number: number;
  launch_year: string;
  rocket: Rocket;
  links: Links;
  details?: string;
}
