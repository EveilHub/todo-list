export type Todo = {
  id: string;
  date: string;
  project: string;
  liste: string;
  delay: string;
  client: string;
  email: string;
  phone: string;
  priority: string;
  selectedDay: string | null;
  isDoneDate: boolean;
  isDoneProject: boolean;
  isDoneListe: boolean;
  isDoneDelay: boolean;
  isDoneClient: boolean;
  isDoneMail: boolean;
  isDonePhone: boolean;
};

export type newTodoCsvType = {
  id: string;
  date: string;
  project: string;
  liste: string;
  delay: string;
  client: string;
  email: string;
  phone: string;
  priority: string;  
  selectedDay: string | null;
};