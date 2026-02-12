export interface Element {
  id: number;
  name: string;
  elementType: 'CHAT';
  elementChat: ElementChat | null;
  createdAt: string;
  updatedAt: string;
}

export interface ElementChat {
  id: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  fontColor: string;
  strokeEnabled: boolean;
  strokeColor: string;
  strokeSize: number;
  shadowEnabled: boolean;
  shadowColor: string | null;
  shadowSize: number | null;
  backgroundColor: string | null;
  backgroundOpacity: number | null;
  extraSettings: Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateChatElementRequest {
  name: string;
  settings: UpdateChatElementRequest;
}

export interface UpdateChatElementRequest {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: string;
  fontColor?: string;
  strokeEnabled?: boolean;
  strokeColor?: string;
  strokeSize?: number;
  shadowEnabled?: boolean;
  shadowColor?: string;
  shadowSize?: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  extraSettings?: Record<string, unknown>;
}
