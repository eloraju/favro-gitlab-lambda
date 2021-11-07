// AKA board
export interface Widget {
  widgetCommonId:	string;
  organizationId:	string;
  collectionIds:	string[];
  name:	string;
  type:	'board' | 'backlog';
  breakdownCardCommonId:	string;
  color:	string;
  ownerRole:	string;
  editRole:	string
}

export interface Card {
  cardId:	string,
  organizationId:	string,
  widgetCommonId:	string,
  todoListUserId:	string,
  todoListCompleted:	boolean,
  columnId:	string,
  laneId:	string,
  parentCardId:	string,
  isLane:	boolean,
  archived:	boolean,
  position:	number,
  listPosition:	number,
  sheetPosition:	number,
  cardCommonId:	string,
  name:	string,
  detailedDescription:	string,
  tags:	Tag[],
  sequentialId:	number,
  startDate:	ISODate,
  dueDate:	ISODate,
  assignments:	CardAssignment[],
  numComments:	number,
  tasksTotal:	number,
  tasksDone:	number,
  attachments:	CardAttachment[],
  customFields:	CardCustomField[],
  timeOnBoard:	CardTimeOnBoard,
  timeOnColumns:	CardTimeOnColumns,
  favroAttachments:	FavroAttachment[],
}

export interface User {
  userId:	string;
  name:	string;
  email:	string;
  organizationRole:	string;
}

export interface Column {
  columnId:	string;
  organizationId:	string;
  widgetCommonId:	string;
  name:	string;
  position:	number;
  cardCount:	number;
  timeSum:	number;
  estimationSum:	number;
}

export type ISODate = string;

export interface CardAssignment {
  userId: string;
  completed: boolean;
}

export interface CardAttachment {
  name:	string,
  fileURL:	string,
  thumbnailURL:	string,
}

export interface CardTimeOnBoard {
  time:	number;
  isStopped:	boolean;
}

export interface CardTimeOnColumns {
 [columnId: string]: number
}


export interface CardCustomField {
  organizationId:	string,
  customFieldId:	string,
  type:	string,
  name:	string,
  enabled:	boolean,
  customFieldItems:	CustomFieldItem[],
}

export interface CustomFieldItem {
  customFieldItemId:	string;
  name:	string;
}

export interface FavroAttachment {
  itemCommonId:	string;
  type:	string;
}

export interface Tag {
  tagId:	string;
  organizationId:	string;
  name:	string;
  color:	string;
}

export interface CardCreatedEvent {
  card:	Card;
  column:	Column;
  sender:	User;
  widget:	Widget;
}